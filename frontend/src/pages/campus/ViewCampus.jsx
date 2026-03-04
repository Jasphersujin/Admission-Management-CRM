"use client"

import api from "@/lib/api"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"

import { ArrowLeft, Pencil } from "lucide-react"

export default function ViewCampus() {

  const navigate = useNavigate()
  const { id } = useParams()

  const [campus, setCampus] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const fetchCampus = async () => {

      try {

        const res = await api.get(
          `/api/v1/campuses/${id}`
        )

        setCampus(res.data)

      } catch (error) {

        console.error("Fetch failed:", error)
        alert("Failed to load campus")

      } finally {

        setLoading(false)

      }

    }

    fetchCampus()

  }, [id])

  const handleBack = () => {
    navigate(-1)
  }

  const handleEdit = () => {
    navigate(`/campuses/edit/${id}`)
  }

  if (loading) {
    return <div className="p-6">Loading campus...</div>
  }

  if (!campus) {
    return <div className="p-6">Campus not found</div>
  }

  return (

    <div className="p-2">

      <div className="max-w-4xl">

        <div className="mb-8 flex items-center justify-between">

          <div>

            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Campuses
            </button>

            <h2 className="text-2xl font-semibold">
              {campus.name}
            </h2>

            <p className="text-muted-foreground text-sm">
              Campus details overview
            </p>

          </div>

          <Button
            onClick={handleEdit}
            className="bg-blue-900 text-white hover:bg-blue-800 px-1 gap-1"
          >
            <Pencil className="h-4 w-4"/>
            Edit
          </Button>

        </div>

        <div className="space-y-8">

          <FieldSet>

            <FieldLegend>Campus Information</FieldLegend>

            <FieldGroup className="grid md:grid-cols-2 gap-6 mt-6">

              <Field>
                <FieldLabel className="text-xs uppercase tracking-wide text-muted-foreground">
                  Campus ID
                </FieldLabel>
                <div className="mt-2 text-sm font-semibold bg-muted/40 px-3 py-2 rounded-md">
                  {campus._id}
                </div>
              </Field>

              <Field>
                <FieldLabel className="text-xs uppercase tracking-wide text-muted-foreground">
                  Campus Name
                </FieldLabel>
                <div className="mt-2 text-sm font-semibold bg-muted/40 px-3 py-2 rounded-md">
                  {campus.name}
                </div>
              </Field>

              <Field>
                <FieldLabel className="text-xs uppercase tracking-wide text-muted-foreground">
                  Institution
                </FieldLabel>
                <div className="mt-2 text-sm font-semibold bg-muted/40 px-3 py-2 rounded-md">
                  {campus.institutionId?.name}
                </div>
              </Field>

              <Field>
                <FieldLabel className="text-xs uppercase tracking-wide text-muted-foreground">
                  Location
                </FieldLabel>
                <div className="mt-2 text-sm font-semibold bg-muted/40 px-3 py-2 rounded-md">
                  {campus.location || "-"}
                </div>
              </Field>

            </FieldGroup>

          </FieldSet>

        </div>

      </div>

    </div>

  )
}