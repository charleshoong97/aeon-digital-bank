"use client"

import { Button } from "@nextui-org/button"
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from "@nextui-org/drawer"
import { useDisclosure } from "@nextui-org/use-disclosure"
import { ArrowLeftRightIcon, HouseIcon, MenuIcon, UserIcon } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { useAuthStore } from "../store/auth"
import { Listbox, ListboxItem } from "@nextui-org/listbox"
import { useTransactionStore } from "../store/transaction"

export default function NextDrawer() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  const { isAuthenticated, user, logout } = useAuthStore((state) => state)

  const pathname = usePathname()
  const router = useRouter()

  const onNavigate = (path: string) => {
    if (pathname !== path) {
      router.push(path)
    }
    onClose()
  }

  return (
    <>
      <Button onPress={onOpen} isIconOnly>
        <MenuIcon />
      </Button>
      <Drawer
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="left"
        size="xs"
      >
        <DrawerContent>
          {(onClose) =>
            isAuthenticated ? (
              <>
                <DrawerHeader className="flex flex-col gap-1">
                  Welcome, {user?.fullname}
                </DrawerHeader>
                <DrawerBody>
                  <Listbox color={"default"} variant={"flat"}>
                    <ListboxItem
                      key={"/home"}
                      className="py-3 px-4"
                      onPress={() => onNavigate("/home")}
                      startContent={<HouseIcon />}
                    >
                      Home
                    </ListboxItem>
                    <ListboxItem
                      className="py-3 px-4"
                      onPress={() => onNavigate("/profile")}
                      startContent={<UserIcon />}
                    >
                      My Profile
                    </ListboxItem>
                    <ListboxItem
                      className="py-3 px-4"
                      onPress={() => onNavigate("/transaction")}
                      startContent={<ArrowLeftRightIcon />}
                    >
                      Transaction
                    </ListboxItem>
                  </Listbox>
                </DrawerBody>
                <DrawerFooter>
                  <Button
                    color="danger"
                    variant="light"
                    onPress={() => {
                      onClose()
                      useTransactionStore.setState({
                        transactions: [],
                      })
                      logout()
                      router.replace("/sign-in")
                    }}
                  >
                    Logout
                  </Button>
                </DrawerFooter>
              </>
            ) : (
              <DrawerBody>
                <div className="flex flex-col items-center justify-center h-full">
                  <span className="text-lg font-semibold">
                    Sign In to Access
                  </span>
                  <Button
                    className="text-medium font-bold mt-2"
                    onPress={() => {
                      if (pathname !== "/sign-in") router.push("/sign-in")
                      onClose()
                    }}
                  >
                    Sign In
                  </Button>
                  <span className="text-xs mt-3">
                    Not yet have account?{" "}
                    <span
                      className="text-blue-600 cursor-pointer"
                      onClick={() => {
                        if (pathname !== "/sign-up") router.push("/sign-up")
                        onClose()
                      }}
                    >
                      Create Now
                    </span>
                  </span>
                </div>
              </DrawerBody>
            )
          }
        </DrawerContent>
      </Drawer>
    </>
  )
}
