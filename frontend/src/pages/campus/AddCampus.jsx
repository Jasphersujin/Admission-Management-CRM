"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "@/lib/api"

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
import { ArrowLeft } from "lucide-react"

export default function AddCampus() {

  const navigate = useNavigate()

  const [institutions, setInstitutions] = useState([])

  const [formData, setFormData] = useState({
    institutionId: "",
    name: "",
    location: ""
  })

  const [loading,setLoading] = useState(false)

  useEffect(() => {

    const fetchInstitutions = async () => {

      const res = await api.get("/api/v1/institutions")

      setInstitutions(res.data.data)

    }

    fetchInstitutions()

  }, [])

  const handleChange = (e) => {

    const { id,value } = e.target

    setFormData(prev => ({
      ...prev,
      [id]: value
    }))

  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    setLoading(true)

    try{

      await api.post("/api/v1/campuses",formData)

      navigate("/campuses")

    }catch(error){

      alert(error.response?.data?.message || "Error")

    }finally{

      setLoading(false)

    }

  }

  return (

    <div className="p-2">
      <div className="max-w-4xl">

        <div className="mb-8">

          <button
            type="button"
            onClick={()=>navigate(-1)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition mb-4"
          >
            <ArrowLeft className="h-4 w-4"/>
            Back to Campus
          </button>

          <h2 className="text-2xl font-semibold">
            Campus Form
          </h2>

        </div>

        <form className="space-y-8" onSubmit={handleSubmit}>

          <FieldGroup>

            <FieldSet>

              <FieldLegend>Campus Information</FieldLegend>

              <FieldGroup className="grid md:grid-cols-2 gap-6 mt-4">

                <Field>

                  <FieldLabel>
                    Institution
                  </FieldLabel>

                  <select
                    id="institutionId"
                    value={formData.institutionId}
                    onChange={handleChange}
                    className="border rounded-md h-10 px-3"
                    required
                  >

                    <option value="">
                      Select Institution
                    </option>

                    {institutions.map(inst => (

                      <option
                        key={inst._id}
                        value={inst._id}
                      >
                        {inst.name}
                      </option>

                    ))}

                  </select>

                  <FieldDescription>
                    Select institution for this campus
                  </FieldDescription>

                </Field>

                <Field>
                  <FieldLabel>Campus Name</FieldLabel>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Field>

                <Field>
                  <FieldLabel>Location</FieldLabel>
                  <Input
                    id="location"
                    value={formData.location}
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
                {loading ? "Saving..." : "Save Campus"}
              </Button>

              <Button
                variant="outline"
                type="button"
                onClick={()=>navigate("/campuses")}
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