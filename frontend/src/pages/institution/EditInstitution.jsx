"use client"

const BASE_API = import.meta.env.VITE_BASE_API

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"

export default function EditInstitution() {
  const navigate = useNavigate()
  const { id } = useParams()

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    email: "",
    phone: "",
    address: "",
  })

  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)

  // Fetch institution by ID
  useEffect(() => {
    const fetchInstitution = async () => {
      try {
        const res = await axios.get(
          `${BASE_API}/api/v1/institutions/${id}`
        )

        setFormData(res.data)
      } catch (error) {
        console.error("Fetch failed:", error)
        alert("Failed to load institution")
      } finally {
        setFetching(false)
      }
    }

    fetchInstitution()
  }, [id])

  const handleBack = () => {
    navigate(-1)
  }

  const handleCancel = () => {
    navigate("/institutions")
  }

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await axios.put(
        `${BASE_API}/api/v1/institutions/${id}`,
        formData
      )

      navigate("/institutions")
    } catch (error) {
      console.error(error)
      alert(error.response?.data?.message || "Update failed")
    } finally {
      setLoading(false)
    }
  }

  if (fetching) {
    return <div className="p-6">Loading institution...</div>
  }

  return (
    <div className="p-2">
      <div className="max-w-4xl">

        <div className="mb-8">
          <button
            type="button"
            onClick={handleBack}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Institutions
          </button>

          <h2 className="text-2xl font-semibold">Edit Institution</h2>
          <p className="text-muted-foreground text-sm">
            Update institution details below.
          </p>
        </div>

        <form className="space-y-8" onSubmit={handleSubmit}>
          <FieldGroup>

            <FieldSet>
              <FieldLegend>Basic Information</FieldLegend>
              <FieldDescription>
                Modify institution details
              </FieldDescription>

              <FieldGroup className="grid md:grid-cols-2 gap-6 mt-4">

                <Field>
                  <FieldLabel htmlFor="name">Institution Name</FieldLabel>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="code">Institution Code</FieldLabel>
                  <Input
                    id="code"
                    required
                    value={formData.code}
                    onChange={handleChange}
                  />
                  <FieldDescription>
                    Must be unique and uppercase
                  </FieldDescription>
                </Field>

                <Field>
                  <FieldLabel htmlFor="email">Email Address</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </Field>

              </FieldGroup>
            </FieldSet>

            <FieldSet>
              <FieldGroup className="mt-6">
                <Field>
                  <FieldLabel htmlFor="address">Address</FieldLabel>
                  <Textarea
                    id="address"
                    rows={4}
                    className="resize-none"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </Field>
              </FieldGroup>
            </FieldSet>

            <Field orientation="horizontal" className="gap-4 pt-4">
              <Button
                type="submit"
                disabled={loading}
                className="bg-blue-900 text-white hover:bg-blue-800"
              >
                {loading ? "Updating..." : "Update Institution"}
              </Button>

              <Button
                variant="outline"
                type="button"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Field>

          </FieldGroup>
        </form>
      </div>
    </div>
  )
}