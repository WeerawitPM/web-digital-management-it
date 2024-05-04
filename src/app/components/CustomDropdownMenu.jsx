import React from "react";
import {
  Dropdown,
  NavbarItem,
  DropdownTrigger,
  Link,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { ChevronDown } from "./Icons";

const CustomDropdownMenu = ({ title, menus, className, size }) => {
  return (
    <Dropdown>
      <NavbarItem>
        <DropdownTrigger>
          <Link
            isBlock
            isExternal
            showAnchorIcon
            anchorIcon={<ChevronDown fill="currentColor" size={16} />}
            className={className}
            size={size}
          >
            {title}
          </Link>
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu
        aria-label="Menu"
        className="w-[340px]"
        itemClasses={{
          base: "gap-4",
        }}
      >
        {menus.map((item, index) => (
          <DropdownItem key={index} description={item.description} startContent={item.startContent} href={item.href}>
            <div className="text-blue-500">{index + 1}.{item.title}</div>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default CustomDropdownMenu;
