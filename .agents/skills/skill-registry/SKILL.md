---
name: skill-registry
description: Manages a JSON registry of project skills, allowing addition of new skills and searching by name or description. Works with skill-creator to automatically register new skills.
metadata:
  author: Phardev
  version: "1.0"
---

## When to Use

- When adding a new skill to the project registry
- When searching for skills by name or description
- After creating a new skill to register it automatically

## Critical Patterns

- Maintain a JSON file with skill names and descriptions
- Use commands to add new skills to the registry
- Search functionality to find skills based on queries

## Integration with skill-creator

This skill is designed to work in conjunction with `skill-creator`. After using `skill-creator` to create a new skill, use this skill to automatically add the new skill to the JSON registry. This ensures that all skills are tracked and searchable.

Example workflow:

1. Use `skill-creator` to create a new skill folder and SKILL.md.
2. Extract the name and description from the new SKILL.md.
3. Use the add command to update `assets/registry.json`.

## Code Examples

No code examples needed, as this is a management skill.

## Commands

```bash
# Add a new skill to the registry
jq '.skills += [{"name": "new-skill", "description": "Description of new skill"}]' assets/registry.json > temp.json && mv temp.json assets/registry.json

# Search for skills
jq '.skills[] | select(.name | contains("search-term"))' assets/registry.json
```
