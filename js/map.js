
// document.addEventListener('DOMContentLoaded', () => {
//     const countrySelector = document.getElementById('countrySelector'); // 국가 선택 드롭다운
//     const mapContainer = document.getElementById('mapContainer'); // 지도 컨테이너
//     const mapFrame = document.getElementById('mapFrame'); // iframe 요소

//     countrySelector.addEventListener('change', () => {
//         const selectedCountry = countrySelector.value;

//         // 국가별 HTML 지도 파일 매핑
        // const countryMaps = {
        //     'Afghanistan': '/html/map/Afghanistan_map.html',
        //     'Algeria': '/html/map/Algeria_map.html',
        //     'Angola': '/html/map/Angola_map.html',
        //     'Armenia': '/html/map/Armenia_map.html',
        //     'Azerbaijan': '/html/map/Azerbaijan_map.html',
        //     'Bangladesh': '/html/map/Bangladesh_map.html',
        //     'Belgium': '/html/map/Belgium_map.html',
        //     'Benin': '/html/map/Benin_map.html',
        //     'Bolivia': '/html/map/Bolivia_map.html',
        //     'Brazil': '/html/map/Brazil_map.html',
        //     'Burkina Faso': '/html/map/Burkina Faso_map.html',
        //     'Burundi': '/html/map/Burundi_map.html',
        //     'Cameroon': '/html/map/Cameroon_map.html',
        //     'Central African Republic': '/html/map/Central African Republic_map.html',
        //     'Chad': '/html/map/Chad_map.html',
        //     'China': '/html/map/China_map.html',
        //     'Colombia': '/html/map/Colombia_map.html',
        //     'Ecuador': '/html/map/Ecuador_map.html',
        //     'Egypt': '/html/map/Egypt_map.html',
        //     'Ethiopia': '/html/map/Ethiopia_map.html',
        //     'France': '/html/map/France_map.html',
        //     'Georgia': '/html/map/Georgia_map.html',
        //     'Ghana': '/html/map/Ghana_map.html',
        //     'Haiti': '/html/map/Haiti_map.html',
        //     'Honduras': '/html/map/Honduras_map.html',
        //     'India': '/html/map/India_map.html',
        //     'Indonesia': '/html/map/Indonesia_map.html',
        //     'Iran, Islamic Rep.': '/html/map/Iran_map.html',
        //     'Iraq': '/html/map/Iraq_map.html',
        //     'Israel': '/html/map/Israel_map.html',
        //     'Kenya': '/html/map/Kenya_map.html',
        //     'Lebanon': '/html/map/Lebanon_map.html',
        //     'Libya': '/html/map/Libya_map.html',
        //     'Mali': '/html/map/Mali_map.html',
        //     'Mauritania': '/html/map/Mauritania_map.html',
        //     'Mexico': '/html/map/Mexico_map.html',
        //     'Morocco': '/html/map/Morocco_map.html',
        //     'Mozambique': '/html/map/Mozambique_map.html',
        //     'Myanmar': '/html/map/Myanmar (Burma)_map.html',
        //     'Niger': '/html/map/Niger_map.html',
        //     'Nigeria': '/html/map/Nigeria_map.html',
        //     'Pakistan': '/html/map/Pakistan_map.html',
        //     'Papua New Guinea': '/html/map/Papua New Guinea_map.html',
        //     'Peru': '/html/map/Peru_map.html',
        //     'Philippines': '/html/map/Philippines_map.html',
        //     'Russian Federation': '/html/map/Russia (Soviet Union)_map.html',
        //     'Saudi Arabia': '/html/map/Saudi Arabia_map.html',
        //     'Somalia': '/html/map/Somalia_map.html',
        //     'South Africa': '/html/map/South Africa_map.html',
        //     'South Sudan': '/html/map/South Sudan_map.html',
        //     'Spain': '/html/map/Spain_map.html',
        //     'Sudan': '/html/map/Sudan_map.html',
        //     'Syrian Arab Republic': '/html/map/Syria_map.html',
        //     'Thailand': '/html/map/Thailand_map.html',
        //     'Togo': '/html/map/Togo_map.html',
        //     'Tunisia': '/html/map/Tunisia_map.html',
        //     'Uganda': '/html/map/Uganda_map.html',
        //     'Ukraine': '/html/map/Ukraine_map.html',
        //     'Venezuela, RB': '/html/map/Venezuela_map.html',
        //     'Yemen, Rep.': '/html/map/Yemen (North Yemen)_map.html',
                    
        //     'Albania': '/html/map/Albania_map.html',
        //     'Andorra': '/html/map/Andorra_map.html',
        //     'Antigua and Barbuda': '/html/map/Antigua_and_Barbuda_map.html',
        //     'Argentina': '/html/map/Argentina_map.html',
        //     'Australia': '/html/map/Australia_map.html',
        //     'Austria': '/html/map/Austria_map.html',
        //     'Bahamas': '/html/map/Bahamas_map.html',
        //     'Bahrain': '/html/map/Bahrain_map.html',
        //     'Barbados': '/html/map/Barbados_map.html',
        //     'Belarus': '/html/map/Belarus_map.html',
        //     'Belize': '/html/map/Belize_map.html',
        //     'Bhutan': '/html/map/Bhutan_map.html',
        //     'Bosnia and Herzegovina': '/html/map/Bosnia_and_Herzegovina_map.html',
        //     'Botswana': '/html/map/Botswana_map.html',
        //     'Brunei': '/html/map/Brunei_map.html',
        //     'Bulgaria': '/html/map/Bulgaria_map.html',
        //     'Cambodia': '/html/map/Cambodia_map.html',
        //     'Canada': '/html/map/Canada_map.html',
        //     'Chile': '/html/map/Chile_map.html',
        //     'Comoros': '/html/map/Comoros_map.html',
        //     'Congo, Dem. Rep.': '/html/map/Congo,_Dem._Rep._map.html',
        //     'Costa Rica': '/html/map/Costa_Rica_map.html',
        //     'Croatia': '/html/map/Croatia_map.html',
        //     'Cuba': '/html/map/Cuba_map.html',
        //     'Cyprus': '/html/map/Cyprus_map.html',
        //     'Czech Republic': '/html/map/Czech_Republic_map.html',
        //     "Côte d'Ivoire": "/html/map/Côte_d'Ivoire_map.html",
        //     'Denmark': '/html/map/Denmark_map.html',
        //     'Djibouti': '/html/map/Djibouti_map.html',
        //     'Dominica': '/html/map/Dominica_map.html',
        //     'Dominican Republic': '/html/map/Dominican_Republic_map.html',
        //     'East Timor': '/html/map/East_Timor_map.html',
        //     'El Salvador': '/html/map/El_Salvador_map.html',
        //     'Equatorial Guinea': '/html/map/Equatorial_Guinea_map.html',
        //     'Eritrea': '/html/map/Eritrea_map.html',
        //     'Estonia': '/html/map/Estonia_map.html',
        //     'Fiji': '/html/map/Fiji_map.html',
        //     'Finland': '/html/map/Finland_map.html',
        //     'Gabon': '/html/map/Gabon_map.html',
        //     'Gambia': '/html/map/Gambia_map.html',
        //     'Germany': '/html/map/Germany_map.html',
        //     'Greece': '/html/map/Greece_map.html',
        //     'Guatemala': '/html/map/Guatemala_map.html',
        //     'Guinea': '/html/map/Guinea_map.html',
        //     'Guinea-Bissau': '/html/map/Guinea-Bissau_map.html',
        //     'Guyana': '/html/map/Guyana_map.html',
        //     'Hong Kong SAR, China': '/html/map/Hong_Kong_SAR,_China_map.html',
        //     'Hungary': '/html/map/Hungary_map.html',
        //     'Iceland': '/html/map/Iceland_map.html',
        //     'Ireland': '/html/map/Ireland_map.html',
        //     'Italy': '/html/map/Italy_map.html',
        //     'Jamaica': '/html/map/Jamaica_map.html',
        //     'Japan': '/html/map/Japan_map.html',
        //     'Jordan': '/html/map/Jordan_map.html',
        //     'Kazakhstan': '/html/map/Kazakhstan_map.html',
        //     'Kiribati': '/html/map/Kiribati_map.html',
        //     'Kuwait': '/html/map/Kuwait_map.html',
        //     'Kyrgyzstan': '/html/map/Kyrgyzstan_map.html',
        //     'Laos': '/html/map/Laos_map.html',
        //     'Latvia': '/html/map/Latvia_map.html',
        //     'Lesotho': '/html/map/Lesotho_map.html',
        //     'Liberia': '/html/map/Liberia_map.html',
        //     'Liechtenstein': '/html/map/Liechtenstein_map.html',
        //     'Lithuania': '/html/map/Lithuania_map.html',
        //     'Luxembourg': '/html/map/Luxembourg_map.html',
        //     'Macao SAR, China': '/html/map/Macao_SAR,_China_map.html',
        //     'Madagascar': '/html/map/Madagascar_map.html',
        //     'Malawi': '/html/map/Malawi_map.html',
        //     'Malaysia': '/html/map/Malaysia_map.html',
        //     'Maldives': '/html/map/Maldives_map.html',
        //     'Malta': '/html/map/Malta_map.html',
        //     'Marshall Islands': '/html/map/Marshall_Islands_map.html',
        //     'Mauritius': '/html/map/Mauritius_map.html',
        //     'Micronesia': '/html/map/Micronesia_map.html',
        //     'Moldova': '/html/map/Moldova_map.html',
        //     'Monaco': '/html/map/Monaco_map.html',
        //     'Mongolia': '/html/map/Mongolia_map.html',
        //     'Montenegro': '/html/map/Montenegro_map.html',
        //     'Myanmar': '/html/map/Myanmar_map.html',
        //     'Namibia': '/html/map/Namibia_map.html',
        //     'Nauru': '/html/map/Nauru_map.html',
        //     'Nepal': '/html/map/Nepal_map.html',
        //     'Netherlands': '/html/map/Netherlands_map.html',
        //     'New Zealand': '/html/map/New Zealand_map.html',
        //     'Nicaragua': '/html/map/Nicaragua_map.html',
        //     'North Macedonia': '/html/map/North_Macedonia_map.html',
        //     'Norway': '/html/map/Norway_map.html',
        //     'Oman': '/html/map/Oman_map.html',
        //     'Palau': '/html/map/Palau_map.html',
        //     'Panama': '/html/map/Panama_map.html',
        //     'Paraguay': '/html/map/Paraguay_map.html',
        //     'Poland': '/html/map/Poland_map.html',
        //     'Portugal': '/html/map/Portugal_map.html',
        //     'Qatar': '/html/map/Qatar_map.html',
        //     'Republic of the Congo': '/html/map/Republic_of_the_Congo_map.html',
        //     'Romania': '/html/map/Romania_map.html',
        //     'Russian Federation': '/html/map/Russian_Federation_map.html',
        //     'Rwanda': '/html/map/Rwanda_map.html',
        //     'Samoa': '/html/map/Samoa_map.html',
        //     'San Marino': '/html/map/San_Marino_map.html',
        //     'Senegal': '/html/map/Senegal_map.html',
        //     'Serbia': '/html/map/Serbia_map.html',
        //     'Seychelles': '/html/map/Seychelles_map.html',
        //     'Sierra Leone': '/html/map/Sierra_Leone_map.html',
        //     'Singapore': '/html/map/Singapore_map.html',
        //     'Slovakia': '/html/map/Slovakia_map.html',
        //     'Slovenia': '/html/map/Slovenia_map.html',
        //     'Solomon Islands': '/html/map/Solomon_Islands_map.html',
        //     'South Korea': '/html/map/South_Korea_map.html',
        //     'Sri Lanka': '/html/map/Sri_Lanka_map.html',
        //     'St. Kitts and Nevis': '/html/map/St._Kitts_and_Nevis_map.html',
        //     'St. Lucia': '/html/map/St._Lucia_map.html',
        //     'St. Vincent and the Grenadines': '/html/map/St._Vincent_and_the_Grenadines_map.html',
        //     'Suriname': '/html/map/Suriname_map.html',
        //     'Sweden': '/html/map/Sweden_map.html',
        //     'Switzerland': '/html/map/Switzerland_map.html',
        //     'Tajikistan': '/html/map/Tajikistan_map.html',
        //     'Tanzania': '/html/map/Tanzania_map.html',
        //     'Tonga': '/html/map/Tonga_map.html',
        //     'Trinidad and Tobago': '/html/map/Trinidad_and_Tobago_map.html',
        //     'Turkey': '/html/map/Turkey_map.html',
        //     'Turkmenistan': '/html/map/Turkmenistan_map.html',
        //     'Tuvalu': '/html/map/Tuvalu_map.html',
        //     'United Arab Emirates': '/html/map/United_Arab_Emirates_map.html',
        //     'United Kingdom': '/html/map/United_Kingdom_map.html',
        //     'United States': '/html/map/United_States_map.html',
        //     'Uruguay': '/html/map/Uruguay_map.html',
        //     'Uzbekistan': '/html/map/Uzbekistan_map.html',
        //     'Vanuatu': '/html/map/Vanuatu_map.html',
        //     'Vietnam': '/html/map/Vietnam_map.html',
        //     'Yemen, Rep.': '/html/map/Yemen,_Rep._map.html',
        //     'Zambia': '/html/map/Zambia_map.html',
        //     'Zimbabwe': '/html/map/Zimbabwe_map.html'
        // };
        
//         if (countryMaps[selectedCountry]) {
//             mapFrame.src = countryMaps[selectedCountry]; // 선택된 국가의 지도 파일을 iframe에 로드
//             mapContainer.style.display = 'block'; // 컨테이너를 표시
//         } else {
//             mapContainer.style.display = 'none'; // 지도 파일이 없는 경우 숨기기
//         }
//     });

//     // 금수조치 국가 리스트
//     const flaggedCountries = ['Afghanistan', 'Azerbaijan', 'Belarus', 'Central African Republic', 'Congo, Dem. Rep.', 'Eritrea', 
//         'Ethiopia', 'Haiti', 'Iran, Islamic Rep.', 'Iraq', 'Lebanon', 'Libya', 'Myanmar', 'Nigeria', 'Russian Federation', 'Serbia', 
//         'Somalia', 'South Sudan', 'Sudan', 'Syrian Arab Republic', 'Ukraine', 'Venezuela, RB', 'Yemen, Rep.', 'Zimbabwe','North Korea'
//     ];

//     // 드롭다운과 경고 박스 참조
//     const alertBox = document.getElementById('alertBox');

//     if (countrySelector && alertBox) {
//         // 경고 박스 스타일 업데이트
//         alertBox.style.backgroundColor = '#FFD1D1'; // 연한 빨강 배경색
//         alertBox.style.color = '#D9534F'; // 글씨 색상
//         alertBox.style.padding = '10px'; // 안쪽 여백
//         alertBox.style.textAlign = 'center'; // 텍스트 가운데 정렬
//         alertBox.style.fontWeight = 'bold'; // 텍스트 굵게
//         alertBox.style.border = '2px solid #D9534F'; // 테두리 추가 (글씨 색상과 동일)
//         alertBox.style.borderRadius = '5px'; // 둥근 모서리 추가

//         // 국가 선택 이벤트 리스너
//         countrySelector.addEventListener('change', () => {
//             const selectedCountry = countrySelector.value;

//             // 선택된 국가가 금수조치 국가 목록에 있는 경우 경고 표시
//             if (flaggedCountries.includes(selectedCountry)) {
//                 alertBox.style.display = 'block';

//                 // 여유 공간을 위한 요소 추가
//                 const space = document.createElement('div');
//                 space.style.height = '20px'; // 원하는 높이
//                 alertBox.parentNode.insertBefore(space, alertBox.nextSibling);
//             } else {
//                 alertBox.style.display = 'none';

//                 // 이미 추가된 여유 공간 제거
//                 const nextElement = alertBox.nextSibling;
//                 if (nextElement && nextElement.tagName === 'DIV' && nextElement.style.height === '20px') {
//                     nextElement.remove();
//                 }
//             }
//         });
//     } else {
//         console.error('국가 선택 드롭다운 또는 경고 박스를 찾을 수 없습니다.');
//     }


// });

document.addEventListener('DOMContentLoaded', () => {
    const countrySelector = document.getElementById('countrySelector'); // 국가 선택 드롭다운
    const mapContainer = document.getElementById('mapContainer'); // 지도 컨테이너
    const mapFrame = document.getElementById('mapFrame'); // iframe 요소
    const alertBox = document.getElementById('alertBox'); // 경고 박스

    // 국가별 HTML 지도 파일 매핑
    const countryMaps = {
        'Afghanistan': '/html/map/Afghanistan_map.html',
        'Algeria': '/html/map/Algeria_map.html',
        'Angola': '/html/map/Angola_map.html',
        'Armenia': '/html/map/Armenia_map.html',
        'Azerbaijan': '/html/map/Azerbaijan_map.html',
        'Bangladesh': '/html/map/Bangladesh_map.html',
        'Belgium': '/html/map/Belgium_map.html',
        'Benin': '/html/map/Benin_map.html',
        'Bolivia': '/html/map/Bolivia_map.html',
        'Brazil': '/html/map/Brazil_map.html',
        'Burkina Faso': '/html/map/Burkina Faso_map.html',
        'Burundi': '/html/map/Burundi_map.html',
        'Cameroon': '/html/map/Cameroon_map.html',
        'Central African Republic': '/html/map/Central African Republic_map.html',
        'Chad': '/html/map/Chad_map.html',
        'China': '/html/map/China_map.html',
        'Colombia': '/html/map/Colombia_map.html',
        'Ecuador': '/html/map/Ecuador_map.html',
        'Egypt': '/html/map/Egypt_map.html',
        'Ethiopia': '/html/map/Ethiopia_map.html',
        'France': '/html/map/France_map.html',
        'Georgia': '/html/map/Georgia_map.html',
        'Ghana': '/html/map/Ghana_map.html',
        'Haiti': '/html/map/Haiti_map.html',
        'Honduras': '/html/map/Honduras_map.html',
        'India': '/html/map/India_map.html',
        'Indonesia': '/html/map/Indonesia_map.html',
        'Iran, Islamic Rep.': '/html/map/Iran_map.html',
        'Iraq': '/html/map/Iraq_map.html',
        'Israel': '/html/map/Israel_map.html',
        'Kenya': '/html/map/Kenya_map.html',
        'Lebanon': '/html/map/Lebanon_map.html',
        'Libya': '/html/map/Libya_map.html',
        'Mali': '/html/map/Mali_map.html',
        'Mauritania': '/html/map/Mauritania_map.html',
        'Mexico': '/html/map/Mexico_map.html',
        'Morocco': '/html/map/Morocco_map.html',
        'Mozambique': '/html/map/Mozambique_map.html',
        'Myanmar': '/html/map/Myanmar (Burma)_map.html',
        'Niger': '/html/map/Niger_map.html',
        'Nigeria': '/html/map/Nigeria_map.html',
        'Pakistan': '/html/map/Pakistan_map.html',
        'Papua New Guinea': '/html/map/Papua New Guinea_map.html',
        'Peru': '/html/map/Peru_map.html',
        'Philippines': '/html/map/Philippines_map.html',
        'Russian Federation': '/html/map/Russia (Soviet Union)_map.html',
        'Saudi Arabia': '/html/map/Saudi Arabia_map.html',
        'Somalia': '/html/map/Somalia_map.html',
        'South Africa': '/html/map/South Africa_map.html',
        'South Sudan': '/html/map/South Sudan_map.html',
        'Spain': '/html/map/Spain_map.html',
        'Sudan': '/html/map/Sudan_map.html',
        'Syrian Arab Republic': '/html/map/Syria_map.html',
        'Thailand': '/html/map/Thailand_map.html',
        'Togo': '/html/map/Togo_map.html',
        'Tunisia': '/html/map/Tunisia_map.html',
        'Uganda': '/html/map/Uganda_map.html',
        'Ukraine': '/html/map/Ukraine_map.html',
        'Venezuela, RB': '/html/map/Venezuela_map.html',
        'Yemen, Rep.': '/html/map/Yemen (North Yemen)_map.html',
                
        'Albania': '/html/map/Albania_map.html',
        'Andorra': '/html/map/Andorra_map.html',
        'Antigua and Barbuda': '/html/map/Antigua_and_Barbuda_map.html',
        'Argentina': '/html/map/Argentina_map.html',
        'Australia': '/html/map/Australia_map.html',
        'Austria': '/html/map/Austria_map.html',
        'Bahamas': '/html/map/Bahamas_map.html',
        'Bahrain': '/html/map/Bahrain_map.html',
        'Barbados': '/html/map/Barbados_map.html',
        'Belarus': '/html/map/Belarus_map.html',
        'Belize': '/html/map/Belize_map.html',
        'Bhutan': '/html/map/Bhutan_map.html',
        'Bosnia and Herzegovina': '/html/map/Bosnia_and_Herzegovina_map.html',
        'Botswana': '/html/map/Botswana_map.html',
        'Brunei': '/html/map/Brunei_map.html',
        'Bulgaria': '/html/map/Bulgaria_map.html',
        'Cambodia': '/html/map/Cambodia_map.html',
        'Canada': '/html/map/Canada_map.html',
        'Chile': '/html/map/Chile_map.html',
        'Comoros': '/html/map/Comoros_map.html',
        'Congo, Dem. Rep.': '/html/map/Congo,_Dem._Rep._map.html',
        'Costa Rica': '/html/map/Costa_Rica_map.html',
        'Croatia': '/html/map/Croatia_map.html',
        'Cuba': '/html/map/Cuba_map.html',
        'Cyprus': '/html/map/Cyprus_map.html',
        'Czech Republic': '/html/map/Czech_Republic_map.html',
        "Côte d'Ivoire": "/html/map/Côte_d'Ivoire_map.html",
        'Denmark': '/html/map/Denmark_map.html',
        'Djibouti': '/html/map/Djibouti_map.html',
        'Dominica': '/html/map/Dominica_map.html',
        'Dominican Republic': '/html/map/Dominican_Republic_map.html',
        'East Timor': '/html/map/East_Timor_map.html',
        'El Salvador': '/html/map/El_Salvador_map.html',
        'Equatorial Guinea': '/html/map/Equatorial_Guinea_map.html',
        'Eritrea': '/html/map/Eritrea_map.html',
        'Estonia': '/html/map/Estonia_map.html',
        'Fiji': '/html/map/Fiji_map.html',
        'Finland': '/html/map/Finland_map.html',
        'Gabon': '/html/map/Gabon_map.html',
        'Gambia': '/html/map/Gambia_map.html',
        'Germany': '/html/map/Germany_map.html',
        'Greece': '/html/map/Greece_map.html',
        'Guatemala': '/html/map/Guatemala_map.html',
        'Guinea': '/html/map/Guinea_map.html',
        'Guinea-Bissau': '/html/map/Guinea-Bissau_map.html',
        'Guyana': '/html/map/Guyana_map.html',
        'Hong Kong SAR, China': '/html/map/Hong_Kong_SAR,_China_map.html',
        'Hungary': '/html/map/Hungary_map.html',
        'Iceland': '/html/map/Iceland_map.html',
        'Ireland': '/html/map/Ireland_map.html',
        'Italy': '/html/map/Italy_map.html',
        'Jamaica': '/html/map/Jamaica_map.html',
        'Japan': '/html/map/Japan_map.html',
        'Jordan': '/html/map/Jordan_map.html',
        'Kazakhstan': '/html/map/Kazakhstan_map.html',
        'Kiribati': '/html/map/Kiribati_map.html',
        'Kuwait': '/html/map/Kuwait_map.html',
        'Kyrgyzstan': '/html/map/Kyrgyzstan_map.html',
        'Laos': '/html/map/Laos_map.html',
        'Latvia': '/html/map/Latvia_map.html',
        'Lesotho': '/html/map/Lesotho_map.html',
        'Liberia': '/html/map/Liberia_map.html',
        'Liechtenstein': '/html/map/Liechtenstein_map.html',
        'Lithuania': '/html/map/Lithuania_map.html',
        'Luxembourg': '/html/map/Luxembourg_map.html',
        'Macao SAR, China': '/html/map/Macao_SAR,_China_map.html',
        'Madagascar': '/html/map/Madagascar_map.html',
        'Malawi': '/html/map/Malawi_map.html',
        'Malaysia': '/html/map/Malaysia_map.html',
        'Maldives': '/html/map/Maldives_map.html',
        'Malta': '/html/map/Malta_map.html',
        'Marshall Islands': '/html/map/Marshall_Islands_map.html',
        'Mauritius': '/html/map/Mauritius_map.html',
        'Micronesia': '/html/map/Micronesia_map.html',
        'Moldova': '/html/map/Moldova_map.html',
        'Monaco': '/html/map/Monaco_map.html',
        'Mongolia': '/html/map/Mongolia_map.html',
        'Montenegro': '/html/map/Montenegro_map.html',
        'Myanmar': '/html/map/Myanmar_map.html',
        'Namibia': '/html/map/Namibia_map.html',
        'Nauru': '/html/map/Nauru_map.html',
        'Nepal': '/html/map/Nepal_map.html',
        'Netherlands': '/html/map/Netherlands_map.html',
        'New Zealand': '/html/map/New Zealand_map.html',
        'Nicaragua': '/html/map/Nicaragua_map.html',
        'North Macedonia': '/html/map/North_Macedonia_map.html',
        'Norway': '/html/map/Norway_map.html',
        'Oman': '/html/map/Oman_map.html',
        'Palau': '/html/map/Palau_map.html',
        'Panama': '/html/map/Panama_map.html',
        'Paraguay': '/html/map/Paraguay_map.html',
        'Poland': '/html/map/Poland_map.html',
        'Portugal': '/html/map/Portugal_map.html',
        'Qatar': '/html/map/Qatar_map.html',
        'Republic of the Congo': '/html/map/Republic_of_the_Congo_map.html',
        'Romania': '/html/map/Romania_map.html',
        'Russian Federation': '/html/map/Russian_Federation_map.html',
        'Rwanda': '/html/map/Rwanda_map.html',
        'Samoa': '/html/map/Samoa_map.html',
        'San Marino': '/html/map/San_Marino_map.html',
        'Senegal': '/html/map/Senegal_map.html',
        'Serbia': '/html/map/Serbia_map.html',
        'Seychelles': '/html/map/Seychelles_map.html',
        'Sierra Leone': '/html/map/Sierra_Leone_map.html',
        'Singapore': '/html/map/Singapore_map.html',
        'Slovakia': '/html/map/Slovakia_map.html',
        'Slovenia': '/html/map/Slovenia_map.html',
        'Solomon Islands': '/html/map/Solomon_Islands_map.html',
        'South Korea': '/html/map/South_Korea_map.html',
        'Sri Lanka': '/html/map/Sri_Lanka_map.html',
        'St. Kitts and Nevis': '/html/map/St._Kitts_and_Nevis_map.html',
        'St. Lucia': '/html/map/St._Lucia_map.html',
        'St. Vincent and the Grenadines': '/html/map/St._Vincent_and_the_Grenadines_map.html',
        'Suriname': '/html/map/Suriname_map.html',
        'Sweden': '/html/map/Sweden_map.html',
        'Switzerland': '/html/map/Switzerland_map.html',
        'Tajikistan': '/html/map/Tajikistan_map.html',
        'Tanzania': '/html/map/Tanzania_map.html',
        'Tonga': '/html/map/Tonga_map.html',
        'Trinidad and Tobago': '/html/map/Trinidad_and_Tobago_map.html',
        'Turkey': '/html/map/Turkey_map.html',
        'Turkmenistan': '/html/map/Turkmenistan_map.html',
        'Tuvalu': '/html/map/Tuvalu_map.html',
        'United Arab Emirates': '/html/map/United_Arab_Emirates_map.html',
        'United Kingdom': '/html/map/United_Kingdom_map.html',
        'United States': '/html/map/United_States_map.html',
        'Uruguay': '/html/map/Uruguay_map.html',
        'Uzbekistan': '/html/map/Uzbekistan_map.html',
        'Vanuatu': '/html/map/Vanuatu_map.html',
        'Vietnam': '/html/map/Vietnam_map.html',
        'Yemen, Rep.': '/html/map/Yemen,_Rep._map.html',
        'Zambia': '/html/map/Zambia_map.html',
        'Zimbabwe': '/html/map/Zimbabwe_map.html'
    };

    // 금수조치 국가 리스트
    const flaggedCountries = [
        'Afghanistan', 'Azerbaijan', 'Belarus', 'Central African Republic', 'Congo, Dem. Rep.',
        'Eritrea', 'Ethiopia', 'Haiti', 'Iran, Islamic Rep.', 'Iraq', 'Lebanon', 'Libya',
        'Myanmar', 'Nigeria', 'Russian Federation', 'Serbia', 'Somalia', 'South Sudan', 'Sudan',
        'Syrian Arab Republic', 'Ukraine', 'Venezuela, RB', 'Yemen, Rep.', 'Zimbabwe', 'North Korea'
    ];

    // 지도 및 경고 박스 업데이트 함수
    function updateMap(selectedCountry) {
        if (countryMaps[selectedCountry]) {
            mapFrame.src = countryMaps[selectedCountry]; // 지도 업데이트
            mapContainer.style.display = 'block';
        } else {
            mapContainer.style.display = 'none';
        }

        // 경고 박스 스타일 업데이트 및 표시 처리
        if (alertBox) {
            // 경고 박스 디자인 설정
            alertBox.style.backgroundColor = '#FFD1D1'; // 연한 빨강 배경색
            alertBox.style.color = '#D9534F'; // 글씨 색상
            alertBox.style.padding = '10px'; // 안쪽 여백
            alertBox.style.textAlign = 'center'; // 텍스트 가운데 정렬
            alertBox.style.fontWeight = 'bold'; // 텍스트 굵게
            alertBox.style.border = '2px solid #D9534F'; // 테두리 추가
            alertBox.style.borderRadius = '5px'; // 둥근 모서리

            // 금수조치 국가 표시 로직
            if (flaggedCountries.includes(selectedCountry)) {
                alertBox.style.display = 'block';

                // 여유 공간 추가
                const space = document.createElement('div');
                space.style.height = '20px'; // 여유 공간 높이
                alertBox.parentNode.insertBefore(space, alertBox.nextSibling);
            } else {
                alertBox.style.display = 'none';

                // 여유 공간 제거
                const nextElement = alertBox.nextSibling;
                if (nextElement && nextElement.tagName === 'DIV' && nextElement.style.height === '20px') {
                    nextElement.remove();
                }
            }
        }
    }

    // countryChange 이벤트 리스너 추가
    document.addEventListener('countryChange', (event) => {
        const selectedCountry = event.detail;
        if (selectedCountry) {
            updateMap(selectedCountry);
        }
    });

    // 드롭다운 변경 이벤트 리스너
    countrySelector.addEventListener('change', () => {
        const selectedCountry = countrySelector.value;
        history.pushState({}, '', `?country=${selectedCountry}`); // URL 갱신
        updateMap(selectedCountry);
    });

    // 초기 URL 파라미터 처리
    const params = new URLSearchParams(window.location.search);
    const countryFromUrl = params.get('country');
    if (countryFromUrl) {
        updateMap(countryFromUrl);
        countrySelector.value = countryFromUrl;
    }
});

