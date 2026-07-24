plugins {
  `java-library`
  `maven-publish`
}

extra["runapiSlug"] = "flux"

description = "RunAPI Flux Java SDK for Flux workflows."

java {
  withSourcesJar()
  withJavadocJar()
}

dependencies {
  api("ai.runapi:runapi-core:0.2.6")

  testImplementation(platform("org.junit:junit-bom:5.10.3"))
  testImplementation("org.junit.jupiter:junit-jupiter")
}

publishing {
  publications {
    create<MavenPublication>("mavenJava") {
      from(components["java"])
      artifactId = "runapi-flux"
      pom {
        name = "RunAPI Flux Java SDK"
        description = "RunAPI Flux Java SDK for Flux workflows."
        url = "https://runapi.ai/models/flux"
        licenses {
          license {
            name = "Apache License, Version 2.0"
            url = "https://www.apache.org/licenses/LICENSE-2.0"
          }
        }
        developers {
          developer {
            id = "runapi"
            name = "RunAPI"
            email = "contact@runapi.ai"
          }
        }
        scm {
          url = "https://github.com/runapi-ai/flux-sdk"
          connection = "scm:git:https://github.com/runapi-ai/flux-sdk.git"
          developerConnection = "scm:git:ssh://git@github.com/runapi-ai/flux-sdk.git"
        }
      }
    }
  }
}
