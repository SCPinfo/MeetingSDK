import { useAppSelector } from "../hooks";
import { useMemo } from "react";

import { Selector } from "../store";
import { createSelector } from "@reduxjs/toolkit";
import { Permission } from "../../room/roles";

const mePermissionsSelect: Selector<Permission[]> = (state) => state.permissions.permissions;

export const makePermissionSelector = (permission: Permission): Selector<boolean> => createSelector(mePermissionsSelect, (p) => p.includes(permission));


/**
 * Hook to check if the user has the given permission.
 *
 * @param permission - The permission to check.
 * @returns {boolean} True if the user has the given permission.
 */
export const usePermissionSelector = (permission: Permission): boolean => {
  const permissionSelector =
    useMemo(() => makePermissionSelector(permission), [permission]);

  return useAppSelector(permissionSelector);
};
