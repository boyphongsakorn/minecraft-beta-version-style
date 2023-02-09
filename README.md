# Minecraft Beta Version Style Github Action

This Github Action custom "tag" like minecraft snapshot Version (2dig year + "W" + Week in a year + Version of this week "A-Z")

## Inputs

```github_token: ${{ secrets.GITHUB_TOKEN }} # need that if your repo is private```

## Outputs

## `betaversion`

generate beta version tag like minecraft snapshot

## Example usage

```
steps:
  - name: Minecraft Custom Tag
    id: mctagcustom
    uses: boyphongsakorn/minecraft-beta-version-style@v1.16
    with:
          github_token: ${{ secrets.GITHUB_TOKEN }} # need that if your repo is private
  - name: echo beta version
    run: echo "The time was ${{ steps.mctagcustom.outputs.betaversion }}"
```
