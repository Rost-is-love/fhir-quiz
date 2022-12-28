fhir quiz


# Upload required resources into Aidbox

```yaml

PUT /

- id: show-static
  resourceType: Operation
  action: box.static/show
  request: [get, Static, {name: "id"}, "$show"]

- id: Static
  resourceType: Entity
  type: resource
  isOpen: true

- id: Question
  resourceType: Entity
  type: resource
  isOpen: true

- id: QuestionResponse
  resourceType: Entity
  type: resource
  isOpen: true

```
