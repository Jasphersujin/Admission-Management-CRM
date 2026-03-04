"use client"

import api from "@/lib/api"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
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

export default function AddInstitution() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    email: "",
    phone: "",
    address: "",
  })

  const [loading, setLoading] = useState(false)

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
      await api.post(
        `/api/v1/institutions`,
        formData
      )
      navigate("/institutions") // redirect after success
    } catch (error) {
      console.error(error)
      alert(error.response?.data?.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
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

          <h2 className="text-2xl font-semibold">Institution Form</h2>
          <p className="text-muted-foreground text-sm">
            Add or update institution details below.
          </p>
        </div>

        <form className="space-y-8" onSubmit={handleSubmit}>
          <FieldGroup>

            <FieldSet>
              <FieldLegend>Basic Information</FieldLegend>
              <FieldDescription>
                Enter core institution details
              </FieldDescription>

              <FieldGroup className="grid md:grid-cols-2 gap-6 mt-4">

                <Field>
                  <FieldLabel htmlFor="name">Institution Name</FieldLabel>
                  <Input
                    id="name"
                    placeholder="Green Valley University"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="code">Institution Code</FieldLabel>
                  <Input
                    id="code"
                    placeholder="GVU001"
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
                    placeholder="admin@gvu.edu"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
                  <Input
                    id="phone"
                    placeholder="+91 9876543210"
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
                    placeholder="Bangalore, India"
                    className="resize-none"
                    rows={4}
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
                {loading ? "Saving..." : "Save Institution"}
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