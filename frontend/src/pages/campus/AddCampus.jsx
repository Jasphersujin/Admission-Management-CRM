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
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"

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
      console.log(res.data.data);
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
                  <Select
                    value={formData.institutionId}
                    onValueChange={(value) =>
                      handleChange({
                        target: {
                          id: "institutionId",
                          value: value
                        }
                      })
                    }
                  >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Institution" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Institutions</SelectLabel>
                      {institutions.map(inst => (
                        <SelectItem 
                          key={inst._id}
                          value={inst._id}
                        >
                          {inst.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>

                  </Select>

                  <FieldDescription>
                    Select institution for this campus
                  </FieldDescription>

                </Field>

                <Field>
                  <FieldLabel>Campus Name</FieldLabel>
                  <Input
                    id="name"
                    placeholder="Enter Campus Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Field>

                <Field>
                  <FieldLabel>Location</FieldLabel>
                  <Input
                    id="location"
                    placeholder="Enter Campus Location"
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
