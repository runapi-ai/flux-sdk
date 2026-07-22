export const contract = {
  "remix-image": {
    "models": [
      "flux-dev",
      "flux-pro"
    ],
    "fields_by_model": {
      "flux-dev": {
        "aspect_ratio": {
          "enum": [
            "1:1",
            "4:3",
            "3:4",
            "16:9",
            "9:16",
            "3:2",
            "2:3"
          ]
        },
        "output_count": {
          "enum": [
            1
          ],
          "type": "integer"
        },
        "prompt": {
          "required": true,
          "min": 3,
          "max": 5000,
          "length": true
        },
        "source_image_url": {
          "required": true
        }
      },
      "flux-pro": {
        "aspect_ratio": {
          "enum": [
            "1:1",
            "4:3",
            "3:4",
            "16:9",
            "9:16",
            "3:2",
            "2:3"
          ]
        },
        "output_count": {
          "enum": [
            1
          ],
          "type": "integer"
        },
        "prompt": {
          "required": true,
          "min": 3,
          "max": 5000,
          "length": true
        },
        "source_image_url": {
          "required": true
        }
      }
    }
  },
  "text-to-image": {
    "models": [
      "flux-2-klein",
      "flux-dev",
      "flux-pro"
    ],
    "fields_by_model": {
      "flux-2-klein": {
        "aspect_ratio": {
          "enum": [
            "1:1",
            "4:3",
            "3:4",
            "16:9",
            "9:16",
            "3:2",
            "2:3"
          ]
        },
        "output_count": {
          "enum": [
            1
          ],
          "type": "integer"
        },
        "prompt": {
          "required": true,
          "min": 3,
          "max": 5000,
          "length": true
        }
      },
      "flux-dev": {
        "aspect_ratio": {
          "enum": [
            "1:1",
            "4:3",
            "3:4",
            "16:9",
            "9:16",
            "3:2",
            "2:3"
          ]
        },
        "output_count": {
          "enum": [
            1
          ],
          "type": "integer"
        },
        "prompt": {
          "required": true,
          "min": 3,
          "max": 5000,
          "length": true
        }
      },
      "flux-pro": {
        "aspect_ratio": {
          "enum": [
            "1:1",
            "4:3",
            "3:4",
            "16:9",
            "9:16",
            "3:2",
            "2:3"
          ]
        },
        "output_count": {
          "enum": [
            1
          ],
          "type": "integer"
        },
        "prompt": {
          "required": true,
          "min": 3,
          "max": 5000,
          "length": true
        }
      }
    }
  }
} as const;
