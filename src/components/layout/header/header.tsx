"use client";

import "./header.css";

import React from "react";
import useIsRoute from "@/hooks/useIsCurrentRoute";

import { useAuthInit } from "@/hooks/useAuth";
import { CONST_MAIN_ROUTES } from "@/constants/navigation";

// ------------------------------------------------------------------

interface HeaderProps {
  slots?: {
    announcementBarSlot?: React.ReactNode;
    leftSlot?: React.ReactNode;
    rightSlot?: React.ReactNode;
    centerSlot?: React.ReactNode;
  };
  children?: React.ReactNode;
}

// ------------------------------------------------------------------

export default function Header({ slots, children }: HeaderProps & { children?: React.ReactNode }) {
  // Get current route using next to determine if it's a main route
  const isMainRoute = useIsRoute((pathname) =>
    CONST_MAIN_ROUTES.includes(pathname)
  );

  // Initialize authentication state on mount
  useAuthInit();

  return (
    <header className={`${!isMainRoute ? "notMain" : ""}`}>
      {!isMainRoute && slots?.announcementBarSlot}
      <div className="navContainer">
        <div>{slots?.leftSlot}</div>
        <div>{slots?.centerSlot}</div>
        <div>{slots?.rightSlot}</div>
      </div>
      {children}
    </header>
  );
}
