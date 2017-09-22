if(typeof amp === 'undefined' && typeof require !== 'undefined'){
    global.amp = require('../src/cms-javascript-sdk');
}

var exampleDeliveryOne = {
    '@content': 'http://schema.amplience.com/sys/cms/api/1.0.0',
    '@type': 'QueryRequest',
    'totalItems': 1,
    'result': [
        {
            '@id': 'http://content.cms.amplience.com/ee67dc86-d59a-497c-8622-e96592d72b02'
        }
    ],
    '@graph': [
        {
            'slides': [
                {
                    '@id': 'http://content.cms.amplience.com/c17ffea4-e205-4ade-8df6-992750d23610',
                    '@type': 'http://schema.cms.amplience.com/21e7a84e-f380-4003-b989-30a231230315'
                },
                {
                    '@id': 'http://content.cms.amplience.com/71cb794e-146c-47f3-ac6a-8dba34b3b36f',
                    '@type': 'http://schema.cms.amplience.com/15ac84c1-8bdf-4012-b116-4de083607e5e'
                },
                {
                    '@id': 'http://content.cms.amplience.com/7cfd354e-d0d1-46cd-b5db-91ec3ec21eb5',
                    '@type': 'http://schema.cms.amplience.com/efefee38-5bc7-473a-a067-9a4b907f490e'
                }
            ],
            'title': 'WK Carousel',
            '@type': 'http://schema.cms.amplience.com/c1949543-f8bc-45ad-82e0-db289a76e716',
            '@context': 'http://context.cms.amplience.com/994c5abe-d4f0-4bfa-9b2e-161f4a4b399f',
            '@id': 'http://content.cms.amplience.com/ee67dc86-d59a-497c-8622-e96592d72b02'
        },
        {
            'image': {
                'id': '22b0b11e-025c-4d5a-9de5-1d1f9b844cf7'
            },
            'title': 'WK Test Image',
            '@type': 'http://schema.cms.amplience.com/21e7a84e-f380-4003-b989-30a231230315',
            '@context': 'http://context.cms.amplience.com/a95d57c3-576a-495c-90ff-4126c5c41db5',
            '@id': 'http://content.cms.amplience.com/c17ffea4-e205-4ade-8df6-992750d23610'
        },
        {
            'title': 'WK Test Text',
            '@type': 'http://schema.cms.amplience.com/15ac84c1-8bdf-4012-b116-4de083607e5e',
            '@context': 'http://context.cms.amplience.com/a95d57c3-576a-495c-90ff-4126c5c41db5',
            '@id': 'http://content.cms.amplience.com/71cb794e-146c-47f3-ac6a-8dba34b3b36f'
        },
        {
            'thumbnail': {
                'id': 'fa300fea-3c0e-428b-b1f4-39d00b22054c'
            },
            'video': {
                'id': '24fb326e-5965-460b-848e-566c986b4c35'
            },
            'title': 'wehkamp test vid1',
            '@type': 'http://schema.cms.amplience.com/efefee38-5bc7-473a-a067-9a4b907f490e',
            '@context': 'http://context.cms.amplience.com/994c5abe-d4f0-4bfa-9b2e-161f4a4b399f',
            '@id': 'http://content.cms.amplience.com/7cfd354e-d0d1-46cd-b5db-91ec3ec21eb5'
        }
    ]
};
var exampleDeliveryTwo = {
    '@content': 'http://schema.amplience.com/sys/cms/api/1.0.0',
    '@type': 'QueryRequest',
    'totalItems': 2,
    'result': [
        {
            '@id': 'http://content.cms.amplience.com/ee67dc86-d59a-497c-8622-e96592d72b02'
        },
        {
            '@id': 'http://content.cms.amplience.com/7cfd354e-d0d1-46cd-b5db-91ec3ec21eb5'
        }
    ],
    '@graph': [
        {
            'thumbnail': {
                'id': 'fa300fea-3c0e-428b-b1f4-39d00b22054c'
            },
            'video': {
                'id': '24fb326e-5965-460b-848e-566c986b4c35'
            },
            'title': 'wehkamp test vid1',
            '@type': 'http://schema.cms.amplience.com/efefee38-5bc7-473a-a067-9a4b907f490e',
            '@context': 'http://context.cms.amplience.com/994c5abe-d4f0-4bfa-9b2e-161f4a4b399f',
            '@id': 'http://content.cms.amplience.com/7cfd354e-d0d1-46cd-b5db-91ec3ec21eb5'
        },
        {
            'slides': [
                {
                    '@id': 'http://content.cms.amplience.com/c17ffea4-e205-4ade-8df6-992750d23610',
                    '@type': 'http://schema.cms.amplience.com/21e7a84e-f380-4003-b989-30a231230315'
                },
                {
                    '@id': 'http://content.cms.amplience.com/71cb794e-146c-47f3-ac6a-8dba34b3b36f',
                    '@type': 'http://schema.cms.amplience.com/15ac84c1-8bdf-4012-b116-4de083607e5e'
                },
                {
                    '@id': 'http://content.cms.amplience.com/7cfd354e-d0d1-46cd-b5db-91ec3ec21eb5',
                    '@type': 'http://schema.cms.amplience.com/efefee38-5bc7-473a-a067-9a4b907f490e'
                }
            ],
            'title': 'WK Carousel',
            '@type': 'http://schema.cms.amplience.com/c1949543-f8bc-45ad-82e0-db289a76e716',
            '@context': 'http://context.cms.amplience.com/994c5abe-d4f0-4bfa-9b2e-161f4a4b399f',
            '@id': 'http://content.cms.amplience.com/ee67dc86-d59a-497c-8622-e96592d72b02'
        },
        {
            'title': 'WK Test Text',
            '@type': 'http://schema.cms.amplience.com/15ac84c1-8bdf-4012-b116-4de083607e5e',
            '@context': 'http://context.cms.amplience.com/a95d57c3-576a-495c-90ff-4126c5c41db5',
            '@id': 'http://content.cms.amplience.com/71cb794e-146c-47f3-ac6a-8dba34b3b36f'
        },
        {
            'image': {
                'id': '22b0b11e-025c-4d5a-9de5-1d1f9b844cf7'
            },
            'title': 'WK Test Image',
            '@type': 'http://schema.cms.amplience.com/21e7a84e-f380-4003-b989-30a231230315',
            '@context': 'http://context.cms.amplience.com/a95d57c3-576a-495c-90ff-4126c5c41db5',
            '@id': 'http://content.cms.amplience.com/c17ffea4-e205-4ade-8df6-992750d23610'
        }
    ]
};

var exampleDeliveryThreeMissingContent = {
    '@content': 'http://schema.amplience.com/sys/cms/api/1.0.0',
    '@type': 'QueryRequest',
    'totalItems': 2,
    'result': [
        {
            '@id': 'http://content.cms.amplience.com/ee67dc86-d59a-497c-8622-e96592d72b02'
        },
        {
            '@id': 'http://content.cms.amplience.com/7cfd354e-d0d1-46cd-b5db-91ec3ec21eb5'
        }
    ],
    '@graph': [
        {
            'thumbnail': {
                'id': 'fa300fea-3c0e-428b-b1f4-39d00b22054c'
            },
            'video': {
                'id': '24fb326e-5965-460b-848e-566c986b4c35'
            },
            'title': 'wehkamp test vid1',
            '@type': 'http://schema.cms.amplience.com/efefee38-5bc7-473a-a067-9a4b907f490e',
            '@context': 'http://context.cms.amplience.com/994c5abe-d4f0-4bfa-9b2e-161f4a4b399f',
            '@id': 'http://content.cms.amplience.com/7cfd354e-d0d1-46cd-b5db-91ec3ec21eb5'
        },
        {
            'slides': [
                {
                    '@id': 'http://content.cms.amplience.com/c17ffea4-e205-4ade-8df6-992750d23610',
                    '@type': 'http://schema.cms.amplience.com/21e7a84e-f380-4003-b989-30a231230315'
                },
                {
                    '@id': 'http://content.cms.amplience.com/71cb794e-146c-47f3-ac6a-8dba34b3b36f',
                    '@type': 'http://schema.cms.amplience.com/15ac84c1-8bdf-4012-b116-4de083607e5e'
                },
                {
                    '@id': 'http://content.cms.amplience.com/7cfd354e-d0d1-46cd-b5db-91ec3ec21eb5',
                    '@type': 'http://schema.cms.amplience.com/efefee38-5bc7-473a-a067-9a4b907f490e'
                }
            ],
            'title': 'WK Carousel',
            '@type': 'http://schema.cms.amplience.com/c1949543-f8bc-45ad-82e0-db289a76e716',
            '@context': 'http://context.cms.amplience.com/994c5abe-d4f0-4bfa-9b2e-161f4a4b399f',
            '@id': 'http://content.cms.amplience.com/ee67dc86-d59a-497c-8622-e96592d72b02'
        },
        {
            'title': 'WK Test Text',
            '@type': 'http://schema.cms.amplience.com/15ac84c1-8bdf-4012-b116-4de083607e5e',
            '@context': 'http://context.cms.amplience.com/a95d57c3-576a-495c-90ff-4126c5c41db5',
            '@id': 'http://content.cms.amplience.com/71cb794e-146c-47f3-ac6a-8dba34b3b36f'
        }
    ]
};

describe('cms-javascript-sdk', function() {
    it('should expose global object', function(){
        expect(amp).not.toBe(undefined);
    });

    it('should have inlineContent property on exposed global of type function', function(){
        expect(typeof amp.inlineContent).toBe('function');
    });

    it('should return empty array if no content - empty delivery', function(){
        expect(amp.inlineContent({})).toEqual([]);
    });

    it('should return empty array if no content - unexpected delivery', function(){
        expect(amp.inlineContent({result:['apples','bananas'],content:[]})).toEqual([]);
    });

    it('should inline content', function(){
        var expectedResponse = [{
            'title': 'WK Carousel',
            '@type': 'http://schema.cms.amplience.com/c1949543-f8bc-45ad-82e0-db289a76e716',
            '@context': 'http://context.cms.amplience.com/994c5abe-d4f0-4bfa-9b2e-161f4a4b399f',
            '@id': 'http://content.cms.amplience.com/ee67dc86-d59a-497c-8622-e96592d72b02',
            'slides': [
                {
                    'image': {
                        'id': '22b0b11e-025c-4d5a-9de5-1d1f9b844cf7'
                    },
                    'title': 'WK Test Image',
                    '@type': 'http://schema.cms.amplience.com/21e7a84e-f380-4003-b989-30a231230315',
                    '@context': 'http://context.cms.amplience.com/a95d57c3-576a-495c-90ff-4126c5c41db5',
                    '@id': 'http://content.cms.amplience.com/c17ffea4-e205-4ade-8df6-992750d23610'
                },
                {
                    'title': 'WK Test Text',
                    '@type': 'http://schema.cms.amplience.com/15ac84c1-8bdf-4012-b116-4de083607e5e',
                    '@context': 'http://context.cms.amplience.com/a95d57c3-576a-495c-90ff-4126c5c41db5',
                    '@id': 'http://content.cms.amplience.com/71cb794e-146c-47f3-ac6a-8dba34b3b36f'
                },
                {
                    'thumbnail': {
                        'id': 'fa300fea-3c0e-428b-b1f4-39d00b22054c'
                    },
                    'video': {
                        'id': '24fb326e-5965-460b-848e-566c986b4c35'
                    },
                    'title': 'wehkamp test vid1',
                    '@type': 'http://schema.cms.amplience.com/efefee38-5bc7-473a-a067-9a4b907f490e',
                    '@context': 'http://context.cms.amplience.com/994c5abe-d4f0-4bfa-9b2e-161f4a4b399f',
                    '@id': 'http://content.cms.amplience.com/7cfd354e-d0d1-46cd-b5db-91ec3ec21eb5'
                }
            ]
        }];

        expect(amp.inlineContent(exampleDeliveryOne)).toEqual(expectedResponse);
    });

    it('should inline content - multiple', function(){
        var expectedResponse = [
            {
                '@id': 'http://content.cms.amplience.com/ee67dc86-d59a-497c-8622-e96592d72b02',
                'title': 'WK Carousel',
                '@type': 'http://schema.cms.amplience.com/c1949543-f8bc-45ad-82e0-db289a76e716',
                '@context': 'http://context.cms.amplience.com/994c5abe-d4f0-4bfa-9b2e-161f4a4b399f',
                'slides': [
                    {
                        '@id': 'http://content.cms.amplience.com/c17ffea4-e205-4ade-8df6-992750d23610',
                        '@type': 'http://schema.cms.amplience.com/21e7a84e-f380-4003-b989-30a231230315',
                        'image': {
                            'id': '22b0b11e-025c-4d5a-9de5-1d1f9b844cf7'
                        },
                        'title': 'WK Test Image',
                        '@context': 'http://context.cms.amplience.com/a95d57c3-576a-495c-90ff-4126c5c41db5'
                    },
                    {
                        '@id': 'http://content.cms.amplience.com/71cb794e-146c-47f3-ac6a-8dba34b3b36f',
                        '@type': 'http://schema.cms.amplience.com/15ac84c1-8bdf-4012-b116-4de083607e5e',
                        'title': 'WK Test Text',
                        '@context': 'http://context.cms.amplience.com/a95d57c3-576a-495c-90ff-4126c5c41db5'
                    },
                    {
                        'thumbnail': {
                            'id': 'fa300fea-3c0e-428b-b1f4-39d00b22054c'
                        },
                        'video': {
                            'id': '24fb326e-5965-460b-848e-566c986b4c35'
                        },
                        'title': 'wehkamp test vid1',
                        '@type': 'http://schema.cms.amplience.com/efefee38-5bc7-473a-a067-9a4b907f490e',
                        '@context': 'http://context.cms.amplience.com/994c5abe-d4f0-4bfa-9b2e-161f4a4b399f',
                        '@id': 'http://content.cms.amplience.com/7cfd354e-d0d1-46cd-b5db-91ec3ec21eb5'
                    }
                ]
            },
            {
                'thumbnail': {
                    'id': 'fa300fea-3c0e-428b-b1f4-39d00b22054c'
                },
                'video': {
                    'id': '24fb326e-5965-460b-848e-566c986b4c35'
                },
                'title': 'wehkamp test vid1',
                '@type': 'http://schema.cms.amplience.com/efefee38-5bc7-473a-a067-9a4b907f490e',
                '@context': 'http://context.cms.amplience.com/994c5abe-d4f0-4bfa-9b2e-161f4a4b399f',
                '@id': 'http://content.cms.amplience.com/7cfd354e-d0d1-46cd-b5db-91ec3ec21eb5'
            }
        ];

        expect(amp.inlineContent(exampleDeliveryTwo)).toEqual(expectedResponse);
    });

    it('should inline available content without failing if missing content', function(){
        var expectedResponse = [{
            'title': 'WK Carousel',
            '@type': 'http://schema.cms.amplience.com/c1949543-f8bc-45ad-82e0-db289a76e716',
            '@context': 'http://context.cms.amplience.com/994c5abe-d4f0-4bfa-9b2e-161f4a4b399f',
            '@id': 'http://content.cms.amplience.com/ee67dc86-d59a-497c-8622-e96592d72b02',
            'slides': [
                {
                    '@id': 'http://content.cms.amplience.com/c17ffea4-e205-4ade-8df6-992750d23610',
                    '@type': "http://schema.cms.amplience.com/21e7a84e-f380-4003-b989-30a231230315"
                },
                {
                    'title': 'WK Test Text',
                    '@type': 'http://schema.cms.amplience.com/15ac84c1-8bdf-4012-b116-4de083607e5e',
                    '@context': 'http://context.cms.amplience.com/a95d57c3-576a-495c-90ff-4126c5c41db5',
                    '@id': 'http://content.cms.amplience.com/71cb794e-146c-47f3-ac6a-8dba34b3b36f'
                },
                {
                    'thumbnail': {
                        'id': 'fa300fea-3c0e-428b-b1f4-39d00b22054c'
                    },
                    'video': {
                        'id': '24fb326e-5965-460b-848e-566c986b4c35'
                    },
                    'title': 'wehkamp test vid1',
                    '@type': 'http://schema.cms.amplience.com/efefee38-5bc7-473a-a067-9a4b907f490e',
                    '@context': 'http://context.cms.amplience.com/994c5abe-d4f0-4bfa-9b2e-161f4a4b399f',
                    '@id': 'http://content.cms.amplience.com/7cfd354e-d0d1-46cd-b5db-91ec3ec21eb5'
                }
            ]
        },{
            'thumbnail': {
                'id': 'fa300fea-3c0e-428b-b1f4-39d00b22054c'
            },
            'video': {
                'id': '24fb326e-5965-460b-848e-566c986b4c35'
            },
            'title': 'wehkamp test vid1',
            '@type': 'http://schema.cms.amplience.com/efefee38-5bc7-473a-a067-9a4b907f490e',
            '@context': 'http://context.cms.amplience.com/994c5abe-d4f0-4bfa-9b2e-161f4a4b399f',
            '@id': 'http://content.cms.amplience.com/7cfd354e-d0d1-46cd-b5db-91ec3ec21eb5'
        }];

        expect(amp.inlineContent(exampleDeliveryThreeMissingContent)).toEqual(expectedResponse);
    });
});