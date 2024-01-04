import React, { useState } from "react";
import { Select } from "antd";
import type { Repository } from "../../types/repository";

interface DropdownListProps {
  list: Repository[];
}

const DropdownList: React.FC<DropdownListProps> = ({ list }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const filteredOptions = list.filter(
    (option) => !selectedItems.includes(option.nameWithOwner)
  );

  return (
    <Select
      mode="multiple"
      placeholder="Inserted are removed"
      value={selectedItems}
      onChange={setSelectedItems}
      style={{ width: "calc(100% / 1.5)" }}
      options={filteredOptions.map((item) => ({
        value: item.nameWithOwner,
        label: item.nameWithOwner,
      }))}
    />
  );
};

export default DropdownList;
