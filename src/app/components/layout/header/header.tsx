"use client";

import "./header.css";
import React from "react";
import useIsRoute from "@/app/hooks/useIsCurrentRoute";

import { CONST_MAIN_ROUTES } from "@/constants/navigation";
import ExpandedHeader from "../expandedHeader/expandedHeader";

// ------------------------------------------------------------------

interface HeaderProps {
  slots?: {
    announcementBarSlot?: React.ReactNode;
    leftSlot?: React.ReactNode;
    rightSlot?: React.ReactNode;
    centerSlot?: React.ReactNode;
  };
}

// ------------------------------------------------------------------

export default function Header({ slots }: HeaderProps) {
  // Get current route using next to determine if it's a main route
  const isMainRoute = useIsRoute((pathname) => CONST_MAIN_ROUTES.includes(pathname));

  return (
    <header className={`${!isMainRoute ? "notMain" : ""}`}>
      {!isMainRoute && slots?.announcementBarSlot}
      <div className="navContainer">
        <div>{slots?.leftSlot}</div>
        <div>{slots?.centerSlot}</div>
        <div>{slots?.rightSlot}</div>
      </div>

      <ExpandedHeader slots={slots} />
    </header>
  );
}
