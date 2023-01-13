/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 100.0, "KoPercent": 0.0};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.3226, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.045, 500, 1500, "Industry_Tourism"], "isController": false}, {"data": [0.007, 500, 1500, "Products"], "isController": false}, {"data": [0.032, 500, 1500, "All_Pages-1"], "isController": false}, {"data": [0.765, 500, 1500, "All_Pages-0"], "isController": false}, {"data": [0.152, 500, 1500, "Products-1"], "isController": false}, {"data": [0.754, 500, 1500, "Products-0"], "isController": false}, {"data": [0.814, 500, 1500, "Industry_Tourism-0"], "isController": false}, {"data": [0.251, 500, 1500, "Industry_Tourism-1"], "isController": false}, {"data": [0.238, 500, 1500, "News-1"], "isController": false}, {"data": [0.0, 500, 1500, "All_Pages"], "isController": false}, {"data": [0.024, 500, 1500, "News"], "isController": false}, {"data": [0.738, 500, 1500, "News-0"], "isController": false}, {"data": [0.028, 500, 1500, "MobileAppDev_Services"], "isController": false}, {"data": [0.774, 500, 1500, "MobileAppDev_Services-0"], "isController": false}, {"data": [0.217, 500, 1500, "MobileAppDev_Services-1"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 7500, 0, 0.0, 1630.9496000000051, 253, 9597, 1626.0, 2640.0, 2986.95, 8013.899999999998, 113.72769041806299, 3125.530788455123, 20.2281282696711], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["Industry_Tourism", 500, 0, 0.0, 2061.6120000000005, 567, 3968, 2118.0, 2524.1000000000004, 2671.35, 3754.560000000002, 8.716723906486985, 268.94188369493213, 2.400504044559893], "isController": false}, {"data": ["Products", 500, 0, 0.0, 2395.7279999999996, 1369, 6131, 2248.5, 2841.7000000000003, 3575.8999999999987, 5899.79, 8.275953389830509, 299.81784497277215, 2.1498082047801907], "isController": false}, {"data": ["All_Pages-1", 500, 0, 0.0, 2889.767999999998, 944, 9075, 2337.5, 5095.600000000002, 8182.299999999999, 8427.97, 8.154478439559005, 513.6290321347609, 0.9954197313914802], "isController": false}, {"data": ["All_Pages-0", 500, 0, 0.0, 486.0440000000001, 254, 1067, 456.5, 868.9000000000001, 943.4499999999998, 1025.93, 8.192020971573687, 7.57601939460965, 1.0000025600065536], "isController": false}, {"data": ["Products-1", 500, 0, 0.0, 1851.8059999999998, 707, 5873, 1702.5, 2433.100000000001, 2854.75, 5377.9400000000005, 8.312137383006666, 293.3766616482137, 1.0796037811912955], "isController": false}, {"data": ["Products-0", 500, 0, 0.0, 543.8660000000001, 254, 2016, 487.0, 925.7, 1030.8, 1240.99, 8.441668073611346, 7.872844736619957, 1.0964275915920987], "isController": false}, {"data": ["Industry_Tourism-0", 500, 0, 0.0, 485.65600000000035, 253, 1083, 375.0, 874.9000000000001, 988.9, 1046.97, 8.80374687466986, 8.279304922174878, 1.2122346770785648], "isController": false}, {"data": ["Industry_Tourism-1", 500, 0, 0.0, 1575.924000000001, 313, 3706, 1552.5, 2189.3, 2353.3999999999996, 2979.7300000000023, 8.805762490974093, 263.4078397153097, 1.2125122179954562], "isController": false}, {"data": ["News-1", 500, 0, 0.0, 1645.9679999999996, 578, 4626, 1539.0, 2288.5, 2589.5999999999995, 3955.3400000000006, 8.426019548365353, 308.0849961556286, 1.0614809782608694], "isController": false}, {"data": ["All_Pages", 500, 0, 0.0, 3375.972000000001, 1600, 9597, 2779.0, 5371.4000000000015, 8737.85, 8970.74, 8.067248584197873, 515.5952835335355, 1.969543111376434], "isController": false}, {"data": ["News", 500, 0, 0.0, 2198.3440000000005, 840, 4886, 2157.5, 2616.0, 3029.2999999999993, 4241.82, 8.350591221858508, 313.0823558792338, 2.103957553944819], "isController": false}, {"data": ["News-0", 500, 0, 0.0, 552.3140000000001, 254, 2050, 517.5, 930.0, 993.0, 1084.8000000000002, 8.431987588114271, 7.830879097945967, 1.0622328113933015], "isController": false}, {"data": ["MobileAppDev_Services", 500, 0, 0.0, 2200.641999999997, 617, 4559, 2200.0, 2641.9, 2815.65, 4149.500000000002, 8.547154652216276, 321.6622493012701, 2.5875175216670367], "isController": false}, {"data": ["MobileAppDev_Services-0", 500, 0, 0.0, 521.4040000000003, 253, 1080, 435.0, 894.9000000000001, 982.8, 1054.8400000000001, 8.634087376964255, 8.237796257123122, 1.3069175228803316], "isController": false}, {"data": ["MobileAppDev_Services-1", 500, 0, 0.0, 1679.1959999999974, 345, 4297, 1615.0, 2315.9, 2519.8, 3601.1800000000017, 8.679199430644516, 318.3507636068149, 1.3137460075682619], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": []}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 7500, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
