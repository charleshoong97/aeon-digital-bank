"use client"

import { Skeleton } from "@nextui-org/skeleton"
import { useEffect } from "react"
import {
  TransactionInterface,
  useTransactionStore,
} from "../../store/transaction"
import NoData from "../../components/no-data"
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react"
import { getDisplay24Time, getDisplayDate } from "../../utils/date"

export default function Transaction() {
  const { transactions, isLoading, fetchData } = useTransactionStore(
    (state) => state
  )

  useEffect(() => {
    if (transactions.length === 0) {
      fetchData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // date: string
  //   reference_id: string
  //   recipient: string
  //   ref_1?: string
  //   transaction_type: string
  //   amount: number

  const columns = [
    {
      key: "date",
      label: "Date",
    },
    {
      key: "reference_id",
      label: "Reference Id",
    },
    {
      key: "recipient",
      label: "To",
    },
    {
      key: "transaction_type",
      label: "Transaction Type",
    },
    {
      key: "amount",
      label: "Amount",
    },
  ]

  if (isLoading) {
    return (
      <div className="w-full max-w-[800px] space-y-5">
        <Skeleton className="rounded-lg">
          <div className="h-20 rounded-lg bg-default-300" />
        </Skeleton>
        <Skeleton className="rounded-lg">
          <div className="h-10 rounded-lg bg-default-300" />
        </Skeleton>
        <Skeleton className="rounded-lg">
          <div className="h-10 rounded-lg bg-default-300" />
        </Skeleton>
        <Skeleton className="rounded-lg">
          <div className="h-10 rounded-lg bg-default-300" />
        </Skeleton>
      </div>
    )
  }

  return (
    <Table aria-label="Example table with dynamic content">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody
        items={transactions.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        )}
        emptyContent={<NoData description="No history found" />}
      >
        {(item) => (
          <TableRow key={item.reference_id}>
            {(columnKey) => (
              <TableCell>
                {columnKey === "recipient" ? (
                  <>
                    <span>{item[columnKey]}</span>
                    <br />
                    <span className="text-gray-400">{item["ref_1"]}</span>
                  </>
                ) : columnKey === "date" ? (
                  <>
                    <span>{getDisplayDate(item[columnKey])}</span>
                    <br />
                    <span className="text-gray-400">
                      {getDisplay24Time(item[columnKey])}
                    </span>
                  </>
                ) : columnKey === "amount" ? (
                  <div className="flex flex-row justify-end gap-1">
                    <span>RM</span>
                    <span>
                      {item[columnKey].toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                ) : (
                  item[columnKey as keyof TransactionInterface] ?? "-"
                )}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
