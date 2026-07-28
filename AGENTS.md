# Working in this repo

This repo is the **published plugin distribution**. For the skills under
`skills/`, it is a mirror rather than the place they are written.

## Don't edit `skills/` here

`H:\skills` is the source of truth for every skill in this repo. Changes made
here are lost the next time it is synced, and the copies drift quietly in the
meantime — this one sat three refinements behind for weeks without anyone
noticing.

Edit the skill in `H:\skills`, then sync:

```bash
cp -r "H:/skills/<skill>/." "H:/DreamForgeSoftwareAgentSkills/skills/<skill>/"
```

**This repo's files are CRLF and `H:\skills` is LF**, so a plain `diff -rq` reports
every file as changed when almost nothing has. Compare with
`diff --strip-trailing-cr` before concluding anything has diverged. `core.autocrlf`
is `true` here, so copying LF files in still produces a clean commit.

`H:\skills\AGENTS.md` covers the house style those skills are written in, and how
enhancements are offered upstream to `leonvanzyl/skills`.

## What is native to this repo

The plugin packaging is edited here and nowhere else: `.claude-plugin/`,
`install.sh` / `install.bat`, `docs/`, and this repo's own `README.md`. The
manifest points at `./skills/` as a directory, so adding a reference file to a
skill needs no manifest change.
