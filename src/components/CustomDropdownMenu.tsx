import React from "react";
import {
  Dropdown,
  NavbarItem,
  DropdownTrigger,
  Link,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { ChevronDown } from "./icon/Icons";

const CustomDropdownMenu = (params: any) => {
  return (
    <Dropdown>
      <NavbarItem>
        <DropdownTrigger>
          <Link
            isBlock
            isExternal
            showAnchorIcon
            anchorIcon={<ChevronDown fill="currentColor" size={16} height={undefined} width={undefined} />}
            className={params.className}
            size={params.size}
          >
            {params.title}
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
        {params.menus.map((item: any, index: any) => (
          <DropdownItem key={index} description={item.description} startContent={item.startContent} href={"/" + params.role + item.href}>
            <div className="text-blue-500">{index + 1}.{item.title}</div>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default CustomDropdownMenu;
