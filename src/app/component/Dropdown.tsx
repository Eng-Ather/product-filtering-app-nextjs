import React from 'react'

interface DropdownProps {
  onSelect: (option: number) => void
}

export const Dropdown: React.FC<DropdownProps> = ({ onSelect }) => {
  return (
    <select onChange={(e) => onSelect(Number(e.target.value))}>
      <option value="0">All Prices</option>
      <option value="50">$50 or less</option>
      <option value="100">$100 or less</option>
      <option value="200">$200 or less</option>
    </select>
  )
}