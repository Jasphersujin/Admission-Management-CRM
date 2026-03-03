"use client"

const BASE_API = import.meta.env.VITE_BASE_API

import { useEffect, useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Plus } from "lucide-react"

export default function Institution() {
  const [institutions, setInstitutions] = useState([])
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  // Fetch Institutions
  const fetchInstitutions = async () => {
    try {
      const res = await axios.get(
        `${BASE_API}/api/v1/institutions`
      )

      setInstitutions(res.data.data)
    } catch (error) {
      console.error("Error fetching institutions:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchInstitutions()
  }, [])

  // Delete Institution
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this institution?"
    )

    if (!confirmDelete) return

    try {
      await axios.delete(
        `${BASE_API}/api/v1/institutions/${id}`
      )

      // refresh list after delete
      fetchInstitutions()
    } catch (error) {
      console.error("Delete failed:", error)
      alert("Failed to delete")
    }
  }

  return (
    <div className="p-1 space-y-6">

      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Institution Management</h1>
          <p className="text-sm text-muted-foreground">
            Manage institution here
          </p>
        </div>

        <Link to="/institutions/new">
          <Button
            variant="secondary"
            className="bg-blue-900 text-white hover:bg-blue-800"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Institution
          </Button>
        </Link>
      </div>

      {/* Table Section */}
      <div className="rounded-xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Code</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6">
                  Loading...
                </TableCell>
              </TableRow>
            ) : institutions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6">
                  No institutions found
                </TableCell>
              </TableRow>
            ) : (
              institutions.map((inst) => (
                <TableRow
                  key={inst._id}
                  className="hover:bg-muted/40"
                >
                  <TableCell>{inst._id.slice(-6)}</TableCell>
                  <TableCell className="font-medium">
                    {inst.name}
                  </TableCell>
                  <TableCell>{inst.code}</TableCell>

                  <TableCell className="text-right flex justify-end items-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() =>
                            navigate(`/institutions/${inst._id}`)
                          }
                        >
                          View
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() =>
                            navigate(`/institutions/edit/${inst._id}`)
                          }
                        >
                          Edit
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          className="text-red-500"
                          onClick={() => handleDelete(inst._id)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}