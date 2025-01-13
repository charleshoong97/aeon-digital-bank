"use client"

import { Avatar } from "@nextui-org/avatar"
import { Button } from "@nextui-org/button"
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown"
import { Input } from "@nextui-org/input"
import { Link } from "@nextui-org/link"
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar"
import Image from "next/image"
import NextDrawer from "./drawer"
import { useAuthStore } from "../store/auth"
import { usePathname, useRouter } from "next/navigation"
import { useTransactionStore } from "../store/transaction"

export default function NextNavbar() {
  const { isAuthenticated, user, logout } = useAuthStore((state) => state)

  const router = useRouter()
  const pathname = usePathname()

  return (
    <Navbar>
      <NavbarBrand>
        <NextDrawer />
        <Link href={isAuthenticated ? "/home" : "/"}>
          <Image
            className="ml-4"
            src={"/AEON_logo.png"}
            alt="AEON"
            width={80}
            height={30}
          />
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Input placeholder="Search document" type="text" size="sm" />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        {isAuthenticated ? (
          <>
            <NavbarItem>
              <Dropdown>
                <DropdownTrigger>
                  <Avatar
                    isBordered
                    as={"button"}
                    showFallback
                    name={user?.fullname}
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem
                    key="profile"
                    className="py-2 gap-2"
                    onPress={() =>
                      pathname === "/profile" ? null : router.push("/profile")
                    }
                  >
                    <p className="font-semibold">Signed in as</p>
                    <p className="font-semibold">{user?.fullname}</p>
                    <p className="font-thin">{user?.email}</p>
                  </DropdownItem>
                  <DropdownItem
                    key="logout"
                    color="danger"
                    onPress={() => {
                      useTransactionStore.setState({
                        transactions: [],
                      })
                      logout()
                      router.replace("/sign-in")
                    }}
                  >
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarItem>
          </>
        ) : (
          <>
            <NavbarItem>
              <Button
                color="default"
                variant="flat"
                onPress={() => router.push("/sign-in")}
              >
                Log In
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button
                color="primary"
                variant="flat"
                onPress={() => router.push("/sign-up")}
              >
                Sign Up
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  )
}
