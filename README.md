# FHIR quiz

https://fhirquiz.edge.aidbox.app/auth/redirect/github

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

- id: QuestionSuggestion
  resourceType: Entity
  type: resource
  isOpen: true

- id: redirects
  resourceType: AidboxConfig
  redirects:
    default-page: /Static/index.html/$show

```


```yaml
PUT /IdentityProvider/github

type: github
title: GitHub
active: true
system: 'https://github.com'
scopes:
  - profile
  - openid
userinfo_endpoint: https://api.github.com/user
authorize_endpoint: https://github.com/login/oauth/authorize
token_endpoint: https://github.com/login/oauth/access_token
client:
  id: "72b2b974c4d51a987efd"
  secret: "..."
  redirect_uri: 'https://fhirquiz.edge.aidbox.app/auth/callback/github'
```


id: Question
resourceType: Entity
type: resource
isOpen: true


Question:
- question
- answer
- explanation
- options
- author


QuestionResponse:
- question (reference Question)
- answer (last provided answer)
- user


Quiz/xmas-quiz


# 

https://fhirquiz.edge.aidbox.app/auth/callback/github




