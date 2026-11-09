let Schema =
      https://raw.githubusercontent.com/shinzui/mori-schema/3522f4a51181d73c9c90fc27a7c0838bd29ae95f/package.dhall
        sha256:dcb19e2312e790bad14e622cc98a1281cd2298c5b564a2f0d0534d3c718d8803

in  Schema.Project::{
    , project = Schema.ProjectIdentity::{
      , name = "mori-docs"
      , namespace = "shinzui"
      , stableId = Some "project_01m707hmpgeagtb9vxvb73a49f"
      , type = Schema.PackageType.Other "Documentation"
      , language = Schema.Language.TypeScript
      , lifecycle = Schema.Lifecycle.Active
      , description = Some "Fumadocs site documenting Mori"
      , domains = [ "Developer Tooling" ]
      }
    , repos =
      [ Schema.Repo::{ name = "mori-docs", github = Some "shinzui/mori-docs" } ]
    , dependencies = [ "shinzui/mori", "fuma-nama/fumadocs" ]
    , dependencyRefs =
      [ Schema.MoriRef::{ namespace = "shinzui", name = "mori" }
      , Schema.MoriRef::{ namespace = "fuma-nama", name = "fumadocs" }
      ]
    , docs =
      [ Schema.DocRef::{
        , key = "mori-docs"
        , kind = Schema.DocKind.Guide
        , audience = Schema.DocAudience.User
        , description = Some "Mori user documentation; start at index.mdx"
        , location = Schema.DocLocation.LocalDir "content/docs"
        }
      ]
    }
