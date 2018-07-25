/**
 * E-Smile EarthMap.js
 * Copyright 2014 eHualu. All rights reserved.
 * @Author: gjj
 * @Date: 2014/12/15
 * @Version: 0.1
 */


ESmile.EarthMap = function () {
    ESmile.GraphicObject.call(this);
    this._radius = 200;
    this._tilt = 0.41;
    var planetTexture = THREE.ImageUtils.loadTexture("textures/planets/land_shallow_topo_2011_8192.jpg");
    var cloudsTexture = THREE.ImageUtils.loadTexture("textures/planets/earth_clouds_1024.png");
    var normalTexture = THREE.ImageUtils.loadTexture("textures/planets/earth_normal_2048.jpg");
    var specularTexture = THREE.ImageUtils.loadTexture("textures/planets/earth_specular_2048.jpg");

    var shader = THREE.ShaderLib[ "normalmap" ];
    var uniforms = THREE.UniformsUtils.clone(shader.uniforms);

    uniforms[ "tNormal" ].value = normalTexture;
    uniforms[ "uNormalScale" ].value.set(0.85, 0.85);

    uniforms[ "tDiffuse" ].value = planetTexture;
    uniforms[ "tSpecular" ].value = specularTexture;

    uniforms[ "enableAO" ].value = false;
    uniforms[ "enableDiffuse" ].value = true;
    uniforms[ "enableSpecular" ].value = true;

    uniforms[ "diffuse" ].value.setHex(0xffffff);
    uniforms[ "specular" ].value.setHex(0x333333);
    uniforms[ "ambient" ].value.setHex(0x888888);

    uniforms[ "shininess" ].value = 5;

    var parameters = {
        fragmentShader: shader.fragmentShader,
        vertexShader: shader.vertexShader,
        uniforms: uniforms,
        lights: true,
        fog: true,
        opacity: 0.4,
        transparent:false
    };

    var materialNormalMap = new THREE.ShaderMaterial(parameters);

    // planet

    geometry = new THREE.SphereGeometry(this._radius, 100, 50);
    geometry.computeTangents();

    meshPlanet = new THREE.Mesh(geometry, materialNormalMap);
    meshPlanet.rotation.y = 0;
 
 
    this.earthMesh = meshPlanet;
    var g = new THREE.Gyroscope();
    console.log(g)
    g.add(meshPlanet);
    this.root = g;
    var materialClouds = new THREE.MeshLambertMaterial({color: 0xffffff, map: cloudsTexture, transparent: true});
    var cloudsScale = 1.005;
    meshClouds = new THREE.Mesh(geometry, materialClouds);
    meshClouds.scale.set(cloudsScale, cloudsScale, cloudsScale);
 

   // this.root.add(meshClouds);
 
    
    
    for (var i =0, l = 30;  i < l; i++){
        var startCityIndex = Math.floor(Math.random() * ESmile.CapitalLocation.length);
        var endCityIndex = Math.floor(Math.random() * ESmile.CapitalLocation.length);
        var startCityLocation =  ESmile.CapitalLocation[startCityIndex];
        var endCityLocation =  ESmile.CapitalLocation[endCityIndex];

        this.add(new ESmile.GlowCurve({
            start: this.WGS2XYZ(startCityLocation.longitude, startCityLocation.latitude),
            end: this.WGS2XYZ(endCityLocation.latitude, endCityLocation.latitude),
            withGlowPoint: false,
            amount: Math.floor(Math.random() * 8),
            normalizerCount: Math.random()*10,
            visible: true,
            style:"sphere",
            pointCloudSize: 30,
            color:  0xeeeeee,
            pointCloudColor:0xFFF63F
        }));
    }

         
 
    //this.root.add(new THREE.AxisHelper(10000));
 
        
       
};

ESmile.CapitalLocation = [
{country:"Afghanistan",capital:"Kabul",latitude:34.28,longitude:69.11},
{country:"Albania",capital:"Tirane",latitude:41.18,longitude:19.49},
{country:"Algeria",capital:"Algiers",latitude:36.42,longitude:3.08},
{country:"American Samoa",capital:"Pago Pago",latitude:-14.16,longitude:-170.43},
{country:"Andorra",capital:"Andorra la Vella",latitude:42.31,longitude:1.32},
{country:"Angola",capital:"Luanda",latitude:-8.50,longitude:13.15},
{country:"Antigua and Barbuda",capital:"W. Indies",latitude:17.20,longitude:-61.48},
{country:"Argentina",capital:"Buenos Aires",latitude:-36.30,longitude:-60.00},
{country:"Armenia",capital:"Yerevan",latitude:40.10,longitude:44.31},
{country:"Aruba",capital:"Oranjestad",latitude:12.32,longitude:-70.02},
{country:"Australia",capital:"Canberra",latitude:-35.15,longitude:149.08},
{country:"Austria",capital:"Vienna",latitude:48.12,longitude:16.22},
{country:"Azerbaijan",capital:"Baku",latitude:40.29,longitude:49.56},
{country:"Bahamas",capital:"Nassau",latitude:25.05,longitude:-77.20},
{country:"Bahrain",capital:"Manama",latitude:26.10,longitude:50.30},
{country:"Bangladesh",capital:"Dhaka",latitude:23.43,longitude:90.26},
{country:"Barbados",capital:"Bridgetown",latitude:13.05,longitude:-59.30},
{country:"Belarus",capital:"Minsk",latitude:53.52,longitude:27.30},
{country:"Belgium",capital:"Brussels",latitude:50.51,longitude:4.21},
{country:"Belize",capital:"Belmopan",latitude:17.18,longitude:-88.30},
{country:"Benin",capital:"Porto-Novo (constitutional cotonou) (seat of gvnt)",latitude:6.23,longitude:2.42},
{country:"Bhutan",capital:"Thimphu",latitude:27.31,longitude:89.45},
{country:"Bolivia",capital:"La Paz (adm.)/sucre (legislative)",latitude:-16.20,longitude:-68.10},
{country:"Bosnia and Herzegovina",capital:"Sarajevo",latitude:43.52,longitude:18.26},
{country:"Botswana",capital:"Gaborone",latitude:-24.45,longitude:25.57},
{country:"Brazil",capital:"Brasilia",latitude:-15.47,longitude:-47.55},
{country:"British Virgin Islands",capital:"Road Town",latitude:18.27,longitude:-64.37},
{country:"Brunei Darussalam",capital:"Bandar Seri Begawan",latitude:4.52,longitude:115.00},
{country:"Bulgaria",capital:"Sofia",latitude:42.45,longitude:23.20},
{country:"Burkina Faso",capital:"Ouagadougou",latitude:12.15,longitude:-1.30},
{country:"Burundi",capital:"Bujumbura",latitude:-3.16,longitude:29.18},
{country:"Cambodia",capital:"Phnom Penh",latitude:11.33,longitude:104.55},
{country:"Cameroon",capital:"Yaounde",latitude:3.50,longitude:11.35},
{country:"Canada",capital:"Ottawa",latitude:45.27,longitude:-75.42},
{country:"Cape Verde",capital:"Praia",latitude:15.02,longitude:-23.34},
{country:"Cayman Islands",capital:"George Town",latitude:19.20,longitude:-81.24},
{country:"Central African Republic",capital:"Bangui",latitude:4.23,longitude:18.35},
{country:"Chad",capital:"N`Djamena",latitude:12.10,longitude:14.59},
{country:"Chile",capital:"Santiago",latitude:-33.24,longitude:-70.40},
{country:"China",capital:"Beijing",latitude:39.55,longitude:116.20},
{country:"Colombia",capital:"Bogota",latitude:4.34,longitude:-74.00},
{country:"Comros",capital:"Moroni",latitude:-11.40,longitude:43.16},
{country:"Congo",capital:"Brazzaville",latitude:-4.09,longitude:15.12},
{country:"Costa Rica",capital:"San Jose",latitude:9.55,longitude:-84.02},
{country:"Cote d`Ivoire",capital:"Yamoussoukro",latitude:6.49,longitude:-5.17},
{country:"Croatia",capital:"Zagreb",latitude:45.50,longitude:15.58},
{country:"Cuba",capital:"Havana",latitude:23.08,longitude:-82.22},
{country:"Cyprus",capital:"Nicosia",latitude:35.10,longitude:33.25},
{country:"Czech Republic",capital:"Prague",latitude:50.05,longitude:14.22},
{country:"Democratic People`s Republic of",capital:"P`yongyang",latitude:39.09,longitude:125.30},
{country:"Democratic Republic of the Congo",capital:"Kinshasa",latitude:-4.20,longitude:15.15},
{country:"Denmark",capital:"Copenhagen",latitude:55.41,longitude:12.34},
{country:"Djibouti",capital:"Djibouti",latitude:11.08,longitude:42.20},
{country:"Dominica",capital:"Roseau",latitude:15.20,longitude:-61.24},
{country:"Dominica Republic",capital:"Santo Domingo",latitude:18.30,longitude:-69.59},
{country:"East Timor",capital:"Dili",latitude:-8.29,longitude:125.34},
{country:"Ecuador",capital:"Quito",latitude:-0.15,longitude:-78.35},
{country:"Egypt",capital:"Cairo",latitude:30.01,longitude:31.14},
{country:"El Salvador",capital:"San Salvador",latitude:13.40,longitude:-89.10},
{country:"Equatorial Guinea",capital:"Malabo",latitude:3.45,longitude:8.50},
{country:"Eritrea",capital:"Asmara",latitude:15.19,longitude:38.55},
{country:"Estonia",capital:"Tallinn",latitude:59.22,longitude:24.48},
{country:"Ethiopia",capital:"Addis Ababa",latitude:9.02,longitude:38.42},
{country:"Falkland Islands (Malvinas)",capital:"Stanley",latitude:-51.40,longitude:-59.51},
{country:"Faroe Islands",capital:"Torshavn",latitude:62.05,longitude:-6.56},
{country:"Fiji",capital:"Suva",latitude:-18.06,longitude:178.30},
{country:"Finland",capital:"Helsinki",latitude:60.15,longitude:25.03},
{country:"France",capital:"Paris",latitude:48.50,longitude:2.20},
{country:"French Guiana",capital:"Cayenne",latitude:5.05,longitude:-52.18},
{country:"French Polynesia",capital:"Papeete",latitude:-17.32,longitude:-149.34},
{country:"Gabon",capital:"Libreville",latitude:0.25,longitude:9.26},
{country:"Gambia",capital:"Banjul",latitude:13.28,longitude:-16.40},
{country:"Georgia",capital:"T`bilisi",latitude:41.43,longitude:44.50},
{country:"Germany",capital:"Berlin",latitude:52.30,longitude:13.25},
{country:"Ghana",capital:"Accra",latitude:5.35,longitude:-0.06},
{country:"Greece",capital:"Athens",latitude:37.58,longitude:23.46},
{country:"Greenland",capital:"Nuuk",latitude:64.10,longitude:-51.35},
{country:"Guadeloupe",capital:"Basse-Terre",latitude:16.00,longitude:-61.44},
{country:"Guatemala",capital:"Guatemala",latitude:14.40,longitude:-90.22},
{country:"Guernsey",capital:"St. Peter Port",latitude:49.26,longitude:-2.33},
{country:"Guinea",capital:"Conakry",latitude:9.29,longitude:-13.49},
{country:"Guinea-Bissau",capital:"Bissau",latitude:11.45,longitude:-15.45},
{country:"Guyana",capital:"Georgetown",latitude:6.50,longitude:-58.12},
{country:"Haiti",capital:"Port-au-Prince",latitude:18.40,longitude:-72.20},
{country:"Heard Island and McDonald Islands",capital:"",latitude:-53.00,longitude:74.00},
{country:"Honduras",capital:"Tegucigalpa",latitude:14.05,longitude:-87.14},
{country:"Hungary",capital:"Budapest",latitude:47.29,longitude:19.05},
{country:"Iceland",capital:"Reykjavik",latitude:64.10,longitude:-21.57},
{country:"India",capital:"New Delhi",latitude:28.37,longitude:77.13},
{country:"Indonesia",capital:"Jakarta",latitude:-6.09,longitude:106.49},
{country:"Iran (Islamic Republic of)",capital:"Tehran",latitude:35.44,longitude:51.30},
{country:"Iraq",capital:"Baghdad",latitude:33.20,longitude:44.30},
{country:"Ireland",capital:"Dublin",latitude:53.21,longitude:-6.15},
{country:"Israel",capital:"Jerusalem",latitude:31.47,longitude:35.12},
{country:"Italy",capital:"Rome",latitude:41.54,longitude:12.29},
{country:"Jamaica",capital:"Kingston",latitude:18.00,longitude:-76.50},
{country:"Jordan",capital:"Amman",latitude:31.57,longitude:35.52},
{country:"Kazakhstan",capital:"Astana",latitude:51.10,longitude:71.30},
{country:"Kenya",capital:"Nairobi",latitude:-1.17,longitude:36.48},
{country:"Kiribati",capital:"Tarawa",latitude:1.30,longitude:173.00},
{country:"Kuwait",capital:"Kuwait",latitude:29.30,longitude:48.00},
{country:"Kyrgyzstan",capital:"Bishkek",latitude:42.54,longitude:74.46},
{country:"Lao People`s Democratic Republic",capital:"Vientiane",latitude:17.58,longitude:102.36},
{country:"Latvia",capital:"Riga",latitude:56.53,longitude:24.08},
{country:"Lebanon",capital:"Beirut",latitude:33.53,longitude:35.31},
{country:"Lesotho",capital:"Maseru",latitude:-29.18,longitude:27.30},
{country:"Liberia",capital:"Monrovia",latitude:6.18,longitude:-10.47},
{country:"Libyan Arab Jamahiriya",capital:"Tripoli",latitude:32.49,longitude:13.07},
{country:"Liechtenstein",capital:"Vaduz",latitude:47.08,longitude:9.31},
{country:"Lithuania",capital:"Vilnius",latitude:54.38,longitude:25.19},
{country:"Luxembourg",capital:"Luxembourg",latitude:49.37,longitude:6.09},
{country:"Macao. China",capital:"Macau",latitude:22.12,longitude:113.33},
{country:"Madagascar",capital:"Antananarivo",latitude:-18.55,longitude:47.31},
{country:"Malawi",capital:"Lilongwe",latitude:-14.00,longitude:33.48},
{country:"Malaysia",capital:"Kuala Lumpur",latitude:3.09,longitude:101.41},
{country:"Maldives",capital:"Male",latitude:4.00,longitude:73.28},
{country:"Mali",capital:"Bamako",latitude:12.34,longitude:-7.55},
{country:"Malta",capital:"Valletta",latitude:35.54,longitude:14.31},
{country:"Martinique",capital:"Fort-de-France",latitude:14.36,longitude:-61.02},
{country:"Mauritania",capital:"Nouakchott",latitude:-20.10,longitude:57.30},
{country:"Mayotte",capital:"Mamoudzou",latitude:-12.48,longitude:45.14},
{country:"Mexico",capital:"Mexico",latitude:19.20,longitude:-99.10},
{country:"Micronesia (Federated States of)",capital:"Palikir",latitude:6.55,longitude:158.09},
{country:"Moldova. Republic of",capital:"Chisinau",latitude:47.02,longitude:28.50},
{country:"Mozambique",capital:"Maputo",latitude:-25.58,longitude:32.32},
{country:"Myanmar",capital:"Yangon",latitude:16.45,longitude:96.20},
{country:"Namibia",capital:"Windhoek",latitude:-22.35,longitude:17.04},
{country:"Nepal",capital:"Kathmandu",latitude:27.45,longitude:85.20},
{country:"Netherlands",capital:"Amsterdam/The Hague (seat of Gvnt)",latitude:52.23,longitude:4.54},
{country:"Netherlands Antilles",capital:"Willemstad",latitude:12.05,longitude:-69.00},
{country:"New Caledonia",capital:"Noumea",latitude:-22.17,longitude:166.30},
{country:"New Zealand",capital:"Wellington",latitude:-41.19,longitude:174.46},
{country:"Nicaragua",capital:"Managua",latitude:12.06,longitude:-86.20},
{country:"Niger",capital:"Niamey",latitude:13.27,longitude:2.06},
{country:"Nigeria",capital:"Abuja",latitude:9.05,longitude:7.32},
{country:"Norfolk Island",capital:"Kingston",latitude:-45.20,longitude:168.43},
{country:"Northern Mariana Islands",capital:"Saipan",latitude:15.12,longitude:145.45},
{country:"Norway",capital:"Oslo",latitude:59.55,longitude:10.45},
{country:"Oman",capital:"Masqat",latitude:23.37,longitude:58.36},
{country:"Pakistan",capital:"Islamabad",latitude:33.40,longitude:73.10},
{country:"Palau",capital:"Koror",latitude:7.20,longitude:134.28},
{country:"Panama",capital:"Panama",latitude:9.00,longitude:-79.25},
{country:"Papua New Guinea",capital:"Port Moresby",latitude:-9.24,longitude:147.08},
{country:"Paraguay",capital:"Asuncion",latitude:-25.10,longitude:-57.30},
{country:"Peru",capital:"Lima",latitude:-12.00,longitude:-77.00},
{country:"Philippines",capital:"Manila",latitude:14.40,longitude:121.03},
{country:"Poland",capital:"Warsaw",latitude:52.13,longitude:21.00},
{country:"Portugal",capital:"Lisbon",latitude:38.42,longitude:-9.10},
{country:"Puerto Rico",capital:"San Juan",latitude:18.28,longitude:-66.07},
{country:"Qatar",capital:"Doha",latitude:25.15,longitude:51.35},
{country:"Republic of Korea",capital:"Seoul",latitude:37.31,longitude:126.58},
{country:"Romania",capital:"Bucuresti",latitude:44.27,longitude:26.10},
{country:"Russian Federation",capital:"Moskva",latitude:55.45,longitude:37.35},
{country:"Rawanda",capital:"Kigali",latitude:-1.59,longitude:30.04},
{country:"Saint Kitts and Nevis",capital:"Basseterre",latitude:17.17,longitude:-62.43},
{country:"Saint Lucia",capital:"Castries",latitude:14.02,longitude:-60.58},
{country:"Saint Pierre and Miquelon",capital:"Saint-Pierre",latitude:46.46,longitude:-56.12},
{country:"Saint vincent and the Grenadines",capital:"Kingstown",latitude:13.10,longitude:-61.10},
{country:"Samoa",capital:"Apia",latitude:-13.50,longitude:-171.50},
{country:"San Marino",capital:"San Marino",latitude:43.55,longitude:12.30},
{country:"Sao Tome and Principe",capital:"Sao Tome",latitude:0.10,longitude:6.39},
{country:"Saudi Arabia",capital:"Riyadh",latitude:24.41,longitude:46.42},
{country:"Senegal",capital:"Dakar",latitude:14.34,longitude:-17.29},
{country:"Sierra Leone",capital:"Freetown",latitude:8.30,longitude:-13.17},
{country:"Slovakia",capital:"Bratislava",latitude:48.10,longitude:17.07},
{country:"Slovenia",capital:"Ljubljana",latitude:46.04,longitude:14.33},
{country:"Solomon Islands",capital:"Honiara",latitude:-9.27,longitude:159.57},
{country:"Somalia",capital:"Mogadishu",latitude:2.02,longitude:45.25},
{country:"South Africa",capital:"Pretoria (adm.) / Cap Town (Legislative) / Bloemfo",latitude:-25.44,longitude:28.12},
{country:"Spain",capital:"Madrid",latitude:40.25,longitude:-3.45},
{country:"Sudan",capital:"Khartoum",latitude:15.31,longitude:32.35},
{country:"Suriname",capital:"Paramaribo",latitude:5.50,longitude:-55.10},
{country:"Swaziland",capital:"Mbabane (Adm.)",latitude:-26.18,longitude:31.06},
{country:"Sweden",capital:"Stockholm",latitude:59.20,longitude:18.03},
{country:"Switzerland",capital:"Bern",latitude:46.57,longitude:7.28},
{country:"Syrian Arab Republic",capital:"Damascus",latitude:33.30,longitude:36.18},
{country:"Tajikistan",capital:"Dushanbe",latitude:38.33,longitude:68.48},
{country:"Thailand",capital:"Bangkok",latitude:13.45,longitude:100.35},
{country:"The Former Yugoslav Republic of Macedonia",capital:"Skopje",latitude:42.01,longitude:21.26},
{country:"Togo",capital:"Lome",latitude:6.09,longitude:1.20},
{country:"Tonga",capital:"Nuku`alofa",latitude:-21.10,longitude:-174.00},
{country:"Tunisia",capital:"Tunis",latitude:36.50,longitude:10.11},
{country:"Turkey",capital:"Ankara",latitude:39.57,longitude:32.54},
{country:"Turkmenistan",capital:"Ashgabat",latitude:38.00,longitude:57.50},
{country:"Tuvalu",capital:"Funafuti",latitude:-8.31,longitude:179.13},
{country:"Uganda",capital:"Kampala",latitude:0.20,longitude:32.30},
{country:"Ukraine",capital:"Kiev (Rus)",latitude:50.30,longitude:30.28},
{country:"United Arab Emirates",capital:"Abu Dhabi",latitude:24.28,longitude:54.22},
{country:"United Kingdom of Great Britain and Northern Irela",capital:"London",latitude:51.36,longitude:-0.05},
{country:"United Republic of Tanzania",capital:"Dodoma",latitude:-6.08,longitude:35.45},
{country:"United States of America",capital:"Washington DC",latitude:39.91,longitude:-77.02},
{country:"United States of Virgin Islands",capital:"Charlotte Amalie",latitude:18.21,longitude:-64.56},
{country:"Uruguay",capital:"Montevideo",latitude:-34.50,longitude:-56.11},
{country:"Uzbekistan",capital:"Tashkent",latitude:41.20,longitude:69.10},
{country:"Vanuatu",capital:"Port-Vila",latitude:-17.45,longitude:168.18},
{country:"Venezuela",capital:"Caracas",latitude:10.30,longitude:-66.55},
{country:"Viet Nam",capital:"Hanoi",latitude:21.05,longitude:105.55},
{country:"Yugoslavia",capital:"Belgrade",latitude:44.50,longitude:20.37},
{country:"Zambia",capital:"Lusaka",latitude:-15.28,longitude:28.16},
{country:"Zimbabwe",capital:"Harare",latitude:-17.43,longitude:31.02}
];
 
ESmile.EarthMap.prototype = Object.create(ESmile.GraphicObject.prototype);

ESmile.EarthMap.prototype.WGS2XYZ = function (longitude, latitude) {
    var lon = longitude*Math.PI/180;
    var lat = latitude*Math.PI/180;
    var r = 1.001*this._radius;
    var vector =  new THREE.Vector3(r * Math.cos(lat) * Math.cos(lon), 
    r * Math.sin(lat) ,
    -r * Math.cos(lat) * Math.sin(lon));
    
    return vector;
};