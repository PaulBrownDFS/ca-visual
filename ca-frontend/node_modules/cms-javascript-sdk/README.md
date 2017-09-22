# README #
##CMS JavaScript SDK

CMS JavaScript SDK library

The source is available for download from
[GitHub](). 
##Inline Content
Takes flattened response from content delivery API and inlines it.

Expects object with result containing ids of top level content and content keys and values with corresponding 
children ids e.g.,

```json
{
    "@content": "http://schema.amplience.com/sys/cms/api/1.0.0",
    "@type": "QueryRequest",
    "totalItems": 2,
    "result": [
        {
            "@id": "http://content.cms.amplience.com/ee67dc86-d59a-497c-8622-e96592d72b02"
        } 
    ],
    "@graph": [ 
        {
            "slides": [ 
                {
                    "@id": "http://content.cms.amplience.com/71cb794e-146c-47f3-ac6a-8dba34b3b36f",
                    "@type": "http://schema.cms.amplience.com/15ac84c1-8bdf-4012-b116-4de083607e5e"
                } 
            ],
            "title": "WK Carousel",
            "@type": "http://schema.cms.amplience.com/c1949543-f8bc-45ad-82e0-db289a76e716",
            "@context": "http://context.cms.amplience.com/994c5abe-d4f0-4bfa-9b2e-161f4a4b399f",
            "@id": "http://content.cms.amplience.com/ee67dc86-d59a-497c-8622-e96592d72b02"
        },
        {
            "title": "WK Test Text",
            "@type": "http://schema.cms.amplience.com/15ac84c1-8bdf-4012-b116-4de083607e5e",
            "@context": "http://context.cms.amplience.com/a95d57c3-576a-495c-90ff-4126c5c41db5",
            "@id": "http://content.cms.amplience.com/71cb794e-146c-47f3-ac6a-8dba34b3b36f"
        }
    ]
}
```

### Usage:
#### Node: 
```javascript

var amp = require('cms-javascript-sdk');
amp.inlineContent({{content}});
 
```
#### Browser:
```html
<script type="text/javascript" src="cms-javascript-sdk.min.js"></script>
<script type="text/javascript"> 
   amp.inlineContent({{content}}); 
</script>
```

Copyright 2016 Amplience

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.