import React, { useState } from "react";
import "./DropdownList.css";
import { Select } from "antd";
import type { Repository } from "../../types/repository";
import type { Issue } from "../../types/issue";
import { fetchIssuesForRepository } from "../../services/github_graphql";

interface DropdownListProps {
  list: Repository[];
  onIssuesChange: (newIssues: Issue[]) => void;
  onChose: (isChosen: boolean) => void;
  onOpen: (isOpen: boolean) => void;
}

const DropdownList: React.FC<DropdownListProps> = ({
  list,
  onIssuesChange,
  onChose,
  onOpen,
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
      onChose(true);
    } else {
      onChose(false);
    }
  };

  return (
    <Select
      className="dropdown"
      mode="multiple"
      placeholder="Inserted are removed"
      value={selectedItems}
      onChange={handleRepositorySelection}
      onDropdownVisibleChange={(isOpen) => onOpen(isOpen)}
      style={{ width: "calc(100% / 1.5)" }}
      options={filteredOptions.map((item) => ({
        value: item.nameWithOwner,
        label: item.nameWithOwner,
      }))}
    />
  );
};

export default DropdownList;
