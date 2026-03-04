"use client"

import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import api from "@/lib/api"

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

  const role = localStorage.getItem("role")

  const fetchInstitutions = async () => {

    try {

      const res = await api.get("/api/v1/institutions")

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

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this institution?")) return

    try {

      await api.delete(`/api/v1/institutions/${id}`)

      fetchInstitutions()

    } catch (error) {

      alert("Delete failed")

    }

  }

  return (
    <div className="p-1 space-y-6">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-2xl font-semibold">
            Institution Management
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage institutions
          </p>
        </div>

        {role === "ADMIN" && (
          <Link to="/institutions/new">
            <Button className="bg-blue-900 text-white hover:bg-blue-800">
              <Plus className="mr-2 h-4 w-4" />
              Add Institution
            </Button>
          </Link>
        )}

      </div>

      <div className="rounded-xl border bg-card">

        <Table>

          <TableHeader>

            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Code</TableHead>
              <TableHead className="text-right">
                Actions
              </TableHead>
            </TableRow>

          </TableHeader>

          <TableBody>

            {loading ? (

              <TableRow>
                <TableCell colSpan={4} className="text-center py-6">
                  Loading...
                </TableCell>
              </TableRow>

            ) : institutions.map((inst) => (

              <TableRow key={inst._id}>

                <TableCell>
                  {inst._id.slice(-6)}
                </TableCell>

                <TableCell className="font-medium">
                  {inst.name}
                </TableCell>

                <TableCell>
                  {inst.code}
                </TableCell>

                <TableCell className="text-right flex justify-end">

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

                      {role === "ADMIN" && (
                        <>
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
                        </>
                      )}

                    </DropdownMenuContent>

                  </DropdownMenu>

                </TableCell>

              </TableRow>

            ))}

          </TableBody>

        </Table>

      </div>

    </div>
  )
}