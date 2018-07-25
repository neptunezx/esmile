var list = {//tt

    "Manual": {
        "Introduction": [
            [ "Creating a scene", "manual/introduction/Creating-a-scene" ],
            [ "Matrix transformations", "manual/introduction/Matrix-transformations" ]

        ]
    },

    "Reference": {
        "Constants": [
            [ "CustomBlendingEquation", "api/constants/CustomBlendingEquations"],
            [ "GLState", "api/constants/GLState"],
            [ "Materials", "api/constants/Materials"],
            [ "ShadowingTypes", "api/constants/ShadowingTypes"],
            [ "Textures", "api/constants/Textures"]
        ],

        "Graphics": [
            [ "BoxCluster", "Manual/graphics/BoxCluster" ],
            [ "Cube", "Manual/graphics/Cube" ],
            [ "CubeCluster", "Manual/graphics/CubeCluster" ],
            [ "Curve", "Manual/graphics/Curve" ],
            [ "DistributionMap", "Manual/graphics/DistributionMap" ],
            [ "DistrictMap", "Manual/graphics/DistrictMap" ],
            [ "EarthMap", "Manual/graphics/EarthMap" ],
            [ "FlowMap", "Manual/graphics/FlowMap" ],
            [ "GlowCurve", "Manual/graphics/GlowCurve" ],
            [ "GlowPoint", "Manual/graphics/GlowPoint" ],
            [ "GraphicObject", "Manual/graphics/GraphicObject" ],
            [ "Map", "Manual/graphics/Map" ],
            [ "PointGlow", "Manual/graphics/PointGlow" ],
            [ "PolygonColumn", "Manual/graphics/PolygonColumn" ],
            [ "Shape", "Manual/graphics/Shape" ],
            [ "Sphere", "Manual/graphics/Sphere" ],
            [ "SphereCluster", "Manual/graphics/SphereCluster" ],
            [ "TestMap", "Manual/graphics/TestMap" ],
            [ "Title", "Manual/graphics/Title" ]
        ],

        "Charts": [
            [ "Chart", "Manual/charts/Chart" ],
            [ "DistributionMapChart", "Manual/charts/DistributionMapChart" ],
            [ "DistrictMapChart", "Manual/charts/DistrictMapChart" ],
            [ "EventCenter", "Manual/charts/EventCenter" ],
            [ "FlowMapChart", "Manual/charts/FlowMapChart" ]
        ],

        "Core": [
            [ "Event", "Manual/core/Event" ],
            [ "EventDispatcher", "Manual/core/EventDispatcher" ]
        ]

    }

};

var pages = {};

for ( var section in list ) {

    pages[ section ] = {};

    for ( var category in list[ section ] ) {

        pages[ section ][ category ] = {};

        for ( var i = 0; i < list[ section ][ category ].length; i ++ ) {

            var page = list[ section ][ category ][ i ];
            pages[ section ][ category ][ page[ 0 ] ] = page[ 1 ];

        }

    }

}
