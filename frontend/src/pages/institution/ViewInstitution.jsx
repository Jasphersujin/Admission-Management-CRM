"use client"

const BASE_API = import.meta.env.VITE_BASE_API

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { ArrowLeft, Pencil } from "lucide-react"

export default function ViewInstitution() {
  const navigate = useNavigate()
  const { id } = useParams()

  const [institution, setInstitution] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchInstitution = async () => {
      try {
        const res = await axios.get(
          `${BASE_API}/api/v1/institutions/${id}`
        )

        setInstitution(res.data)
        console.log(res.data)
      } catch (error) {
        console.error("Fetch failed:", error)
        alert("Failed to load institution")
      } finally {
        setLoading(false)
      }
    }

    fetchInstitution()
  }, [id])

  const handleBack = () => {
    navigate(-1)
  }

  const handleEdit = () => {
    navigate(`/institutions/edit/${id}`)
  }

  if (loading) {
    return <div className="p-6">Loading institution...</div>
  }

  if (!institution) {
    return <div className="p-6">Institution not found</div>
  }

  return (
    <div className="p-2">
      <div className="max-w-4xl">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">

          <div>
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Institutions
            </button>

            <h2 className="text-2xl font-semibold">
              {institution.name}
            </h2>
            <p className="text-muted-foreground text-sm">
              Institution details overview
            </p>
          </div>

          <Button
            onClick={handleEdit}
            className="bg-blue-900 text-white hover:bg-blue-800 px-1 gap-1"
          >
            <Pencil className="h-4 w-4 mr-" />
            Edit
          </Button>

        </div>

        {/* Details Card */}
        <div className="space-y-8">

          {/* Basic Info */}
          {/* <FieldSet>
            <FieldLegend>Basic Information</FieldLegend>

            <FieldGroup className="grid md:grid-cols-2 gap-6 mt-6">

              <Field>
                <FieldLabel>Institution ID</FieldLabel>
                <div className="mt-1 text-sm font-medium">
                  {institution._id}
                </div>
              </Field>

              <Field>
                <FieldLabel>Institution Name</FieldLabel>
                <div className="mt-1 text-sm font-medium">
                  {institution.name}
                </div>
              </Field>

              <Field>
                <FieldLabel>Institution Code</FieldLabel>
                <div className="mt-1 text-sm font-medium">
                  {institution.code}
                </div>
              </Field>

              <Field>
                <FieldLabel>Email Address</FieldLabel>
                <div className="mt-1 text-sm font-medium">
                  {institution.email}
                </div>
              </Field>

              <Field>
                <FieldLabel>Phone Number</FieldLabel>
                <div className="mt-1 text-sm font-medium">
                  {institution.phone || "-"}
                </div>
              </Field>

            </FieldGroup>
          </FieldSet> */}

        <FieldSet>
        <FieldLegend>Basic Information</FieldLegend>

        <FieldGroup className="grid md:grid-cols-2 gap-6 mt-6">

            <Field>
            <FieldLabel className="text-xs uppercase tracking-wide text-muted-foreground">
                Institution ID
            </FieldLabel>
            <div className="mt-2 text-sm font-semibold bg-muted/40 px-3 py-2 rounded-md">
                {institution._id}
            </div>
            </Field>

            <Field>
            <FieldLabel className="text-xs uppercase tracking-wide text-muted-foreground">
                Institution Name
            </FieldLabel>
            <div className="mt-2 text-sm font-semibold bg-muted/40 px-3 py-2 rounded-md">
                {institution.name}
            </div>
            </Field>

            <Field>
            <FieldLabel className="text-xs uppercase tracking-wide text-muted-foreground">
                Institution Code
            </FieldLabel>
            <div className="mt-2 text-sm font-semibold bg-muted/40 px-3 py-2 rounded-md">
                {institution.code}
            </div>
            </Field>

            <Field>
            <FieldLabel className="text-xs uppercase tracking-wide text-muted-foreground">
                Email Address
            </FieldLabel>
            <div className="mt-2 text-sm font-semibold bg-muted/40 px-3 py-2 rounded-md">
                {institution.email}
            </div>
            </Field>

            <Field>
            <FieldLabel className="text-xs uppercase tracking-wide text-muted-foreground">
                Phone Number
            </FieldLabel>
            <div className="mt-2 text-sm font-semibold bg-muted/40 px-3 py-2 rounded-md">
                {institution.phone || "-"}
            </div>
            </Field>

        </FieldGroup>
        </FieldSet>

          {/* Address */}
          <FieldSet>
            <FieldLegend>Address</FieldLegend>

            <FieldGroup className="mt-6">
              <Field>
                <FieldLabel>Address</FieldLabel>
                <div className="mt-2 text-sm font-semibold bg-muted/40 px-3 py-2 rounded-md">
                    {institution.address || "-"}
                 </div>
              </Field>
            </FieldGroup>
          </FieldSet>

          {/* Meta Info (Professional Touch) */}
          {/* <FieldSet>
            <FieldLegend>System Information</FieldLegend>

            <FieldGroup className="grid md:grid-cols-2 gap-6 mt-6">

              <Field>
                <FieldLabel>Created At</FieldLabel>
                <div className="mt-1 text-sm">
                  {new Date(institution.createdAt).toLocaleString()}
                </div>
              </Field>

              <Field>
                <FieldLabel>Last Updated</FieldLabel>
                <div className="mt-1 text-sm">
                  {new Date(institution.updatedAt).toLocaleString()}
                </div>
              </Field>

            </FieldGroup>
          </FieldSet> */}

        </div>
      </div>
    </div>
  )
}