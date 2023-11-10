import { useState } from "react";
import { View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

interface DropdownProps {
  value: string;
  setValue: () => {};
  items: DrowpdownItem[];
  setItems: (items: DrowpdownItem[]) => {};
  zIndex: number;
  zIndexInverse: number;
  placeholder: string;
}

type DrowpdownItem = { label: string; value: string };
export default function Dropdown({
  items,
  setItems,
  value,
  setValue,
  zIndex,
  zIndexInverse,
  placeholder,
}: DropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems as any}
      zIndex={zIndex}
      placeholder={placeholder}
      zIndexInverse={zIndexInverse}
    />
  );
}
