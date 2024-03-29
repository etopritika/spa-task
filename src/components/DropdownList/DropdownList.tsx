import React, { useState } from "react";

import { Select } from "antd";

import type { Repository, Issue } from "../../types/types";
import { fetchIssuesForRepository } from "../../services/github_graphql";


interface DropdownListProps {
  list: Repository[];
  onIssuesChange: (newIssues: Issue[]) => void;
  onChose: (isChosen: boolean) => void;
  onOpen: (isOpen: boolean) => void;
  repoName: (repoName: string) => void;
}

const DropdownList: React.FC<DropdownListProps> = ({
  list,
  onIssuesChange,
  onChose,
  onOpen,
  repoName,
}) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const filteredOptions = list.filter(
    (option) => !selectedItems.includes(option.nameWithOwner)
  );

  const fetchIssues = async (repositoryName: string) => {
    const issues = await fetchIssuesForRepository(repositoryName);
    onIssuesChange(issues);
  };

  const handleRepositorySelection = (selectedItem: string[]) => {
    setSelectedItems(selectedItem);
    if (selectedItem.length > 0) {
      const repositoryName = selectedItem[selectedItem.length - 1];
      fetchIssues(repositoryName);
      repoName(repositoryName);
      onChose(true);
    } else {
      onChose(false);
    }
  };

  return (
    <Select
      style={{marginBottom: "10px", width: "calc(100% / 1.5)"}}
      mode="multiple"
      placeholder="Inserted are removed"
      value={selectedItems}
      onChange={handleRepositorySelection}
      onDropdownVisibleChange={(isOpen) => onOpen(isOpen)}
      options={filteredOptions.map((item) => ({
        value: item.nameWithOwner,
        label: item.nameWithOwner,
      }))}
    />
  );
};

export default DropdownList;
