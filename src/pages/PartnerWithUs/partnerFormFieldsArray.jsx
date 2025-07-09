const formFields = [
  {
    name: "institutionName",
    label: "Institution Name",
    required: true,
  },
  {
    name: "institutionType",
    label: "Institution Type",
    required: true,
    type: "select",
    options: [
      "Flying School",
      "Aviation Institute",
      "University",
      "College",
      "Other",
    ],
  },
  {
    name: "contactPerson",
    label: "Contact Person",
    required: true,
  },
  {
    name: "position",
    label: "Position/Title",
  },
  {
    name: "email",
    label: "Email Address",
    required: true,
  },
  {
    name: "phone",
    label: "Phone No",
    required: true,
  },
  {
    name: "estimatedStudents",
    label: "Estimated Students",
    required: true,
  },
  {
    name: "message",
    label:
      "Tell Us About Your Needs And How The Cockpit Can Help Your Institution",
    type: "multiline",
  },
];

export default formFields;