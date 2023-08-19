/*global $ , alert , console , confirm */
$(function() {
  'use strict';
  $(".navbar-cont  .navcont-div .Star-Ind-Loc").niceScroll()
  $(".navbar-cont  .navcont-div .Star-Ind-Eq").niceScroll()
  $(".first-third-data div").niceScroll()
  $(".second-third-data p ").niceScroll()
  $(".third-small-data").niceScroll()
  $(".Equipment-first-first-panel > div").niceScroll()
  $(".Equipment-Second-first-panel .Equipment-ShowNotes .Equipment-ShowNotes-data").niceScroll()
  $(".Equipment_Catalogues").niceScroll()
  $(".second-chart").niceScroll()
  $(".table").niceScroll()
  try {
    $(".navbar-logout").on("click", function () {
      window.location.assign('logout.php');
    });
  } catch (e) {}
  
  try {
    $(".navbar-home").on("click", function () {
      window.location.href = 'Dashboard.php';
    });
  } catch (e1) {}

  $(".Upload-Catalogue").on("click", function () {
    $(".Eq_Add_Cat").click();
  });
  
  // var navstar = document.querySelector(".navcont-star"),

  var StartMouseEnter = function () {
    $(".Star-Ind,.Star-Ind-Triangle").fadeIn(200);
  },

  StartMouseLeave = function () {
    $(".Star-Ind,.Star-Ind-Triangle").fadeOut(200);
    $(".Star-Ind-Loc,.Star-Ind-Loc-Triangle").fadeOut(200);
    $(".Star-Ind-Eq,.Star-Ind-Eq-Triangle").fadeOut(200);
  },

  StartMouseEnterLoc = function () {
    $(".Star-Ind-Loc,.Star-Ind-Loc-Triangle").fadeIn(200);
    $(".Star-Ind-Eq,.Star-Ind-Eq-Triangle").fadeOut(200);
  },
  StartMouseLeaveLoc = function () {
    // $(".Star-Ind-Loc,.Star-Ind-Loc-Triangle").fadeOut(200);
  },

  StartMouseEnterEq = function () {
    $(".Star-Ind-Eq,.Star-Ind-Eq-Triangle").fadeIn(200);
    $(".Star-Ind-Loc,.Star-Ind-Loc-Triangle").fadeOut(200);
  },
  StartMouseLeaveEq = function () {
    // $(".Star-Ind-Eq,.Star-Ind-Eq-Triangle").fadeOut(200);
  }
  ;

  $(".navcont-star").hover(StartMouseEnter,StartMouseLeave);
  $(".navbar-cont  .navcont-div .Star-Ind a:nth-child(1)").hover(StartMouseEnterLoc,StartMouseLeaveLoc)
  $(".navbar-cont  .navcont-div .Star-Ind a:nth-child(2)").hover(StartMouseEnterEq,StartMouseLeaveEq)
  // $(".Site_Activities a:first-child").addClass("Active")
  $(".Site_Activities a").click(function (e) {
    $(".Site_Activities a").each(function() {
      $(this).removeClass("Active")
    })
    // console.log(this)
    // console.log(e.target)
    $(e.target).addClass("Active")
  })

  // window.onload(function () {
  //   $(".Star-Ind ").fadeOut(200);
  // });
  // $(window).on("load", function () {
  //   $(".Star-Ind ").fadeOut(200);
  // });

// try {
//   $(".navcont-star").on("hover", function () {

//   })
// } catch (e1) {}













})



// var xValues = [100,200,300,400,500,600,700,800,900,1000];

// new Chart("EquipmentmyChart", {
//   type: "line",
//   data: {
//     labels: xValues,
//     datasets: [{
//       data: [860,1140,1060,1060,1070,1110,1330,2210,7830,2478],
//       borderColor: "black",
//       fill: true,
//       backgroundColor: "rgba(2,45,78,0.6)"
//     }]
//   },
//   options: {
//     scales: {
//         yAxes: [{
//             ticks: {
//                 fontColor: "orange"
//             },
//             gridLines: {color: "grey"}
//         }],
//         xAxes: [{
//             ticks: {
//                 fontColor: "orange"
//             },
//             gridLines: {color: "grey"}
//         }]
//     },
//     legend: {display: false, labels:{fontColor: "white"}},
//     grid: {color: "white"}
// }
//   // options: {
//   //   legend: {display: true}, labels:{fontColor: "orange"} 
//   // }
// });

// var xyValues = [
//     {x:50, y:7},
//     {x:60, y:8},
//     {x:70, y:8},
//     {x:80, y:9},
//     {x:90, y:9},
//     {x:100, y:9},
//     {x:110, y:10},
//     {x:120, y:11},
//     {x:130, y:14},
//     {x:140, y:14},
//     {x:150, y:15}
//   ];
  
//   console.log(xyValues);
//   new Chart("myChart", {
//     type: "scatter",
//     data: {
//       datasets: [{
//         pointRadius: 4,
//         pointBackgroundColor: "rgba(0,0,255,1)",
//         data: xyValues
//       }]
//     },
//     options:{legend: {display: false}}
//   });

// var xValues = ["Italy", "France", "Spain", "USA", "Argentina","Italy", "France", "Spain", "USA", "Argentina","Italy", "France", "Spain", "USA", "Argentina","Italy", "France", "Spain", "USA", "Argentina"];
// var yValues = [55, 49, 44, 24, 15,15, 24, 44, 49, 55,55, 49, 44, 24, 15,15, 24, 44, 49, 55];
// // var barColors = ["rgb(0,72,124)", "rgb(0,72,124)","rgb(0,72,124)","rgb(0,72,124)","rgb(0,72,124)","rgb(0,72,124)", "rgb(0,72,124)","rgb(0,72,124)","rgb(0,72,124)","rgb(0,72,124)","rgb(0,72,124)", "rgb(0,72,124)","rgb(0,72,124)","rgb(0,72,124)","rgb(0,72,124)","rgb(0,72,124)", "rgb(0,72,124)","rgb(0,72,124)","rgb(0,72,124)","rgb(0,72,124)"];

// new Chart("secondchart", {
//   type: "bar",
//   data: {
//     labels: xValues,
//     datasets: [{
//       backgroundColor: "orange",
//       data: yValues
//     }]
//   },
//   options: {
//     scales: {
//         yAxes: [{
//             ticks: {
//                 beginAtZero: true,
//                 fontColor: "orange"
//             },
//             gridLines: {display: true, color: "white"}
//         }],
//         xAxes: [{
//           ticks: {
//             fontColor: "white",
//             display: false
//         },
//             // Change here
//             barPercentage: 0.2,
//             gridLines: {display: false, color: "white"}
//         }]
//     },
//     legend: {display: false}
// }
// });

// var xValues = ["Italy", "France", "Spain", "USA", "Argentina"];
// var yValues = [55, 49, 44, 24, 15];
// var barColors = ["green", "blue","orange","grey","red"];

// new Chart("Equipmentthirdchart", {
//   // type: "doughnut",
//   type: "pie",
//   data: {
//     labels: xValues,
//     datasets: [{
//       backgroundColor: barColors,
//       data: yValues
//     }]
//   },
//   options: {
//     // scales: {
//     //     yAxes: [{
//     //         ticks: {
//     //             fontColor: "orange"
//     //         }
//     //     }],
//     //     xAxes: [{
//     //         ticks: {
//     //             fontColor: "orange"
//     //         },
//     //     }]
//     // },
//     legend: {display: false, labels:{fontColor: "white"}},
//     fontColor: "orange",
//     // cutoutPercentage: 75
// }
// });


           // setup 
            // const data = {
            //   labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            //   datasets: [{
            //     data: [
            //         ['2022-11-25 10:00:00', '2022-11-26 02:00:00'],
            //         ['2022-11-26 00:00:00', '2022-11-26 03:00:00'],
            //         ['2022-11-26 03:30:00', '2022-11-26 06:30:00'],
            //         ['2022-11-26 17:00:00', '2022-11-26 20:00:00'],
            //         ['2022-11-27 20:00:00', '2022-11-27 22:00:00'],
            //         ['2022-11-28 01:00:00', '2022-11-29 02:00:00'],
            //         ['2022-11-29 01:00:00', '2022-12-01 13:00:00'],
            //     ],
            //     backgroundColor: [
            //       'rgba(255, 26, 104, 1)',
            //       'rgba(54, 162, 235, 1)',
            //       'rgba(255, 206, 86, 1)',
            //       'rgba(75, 192, 192, 1)',
            //       'rgba(153, 102, 255, 1)',
            //       'rgba(255, 159, 64, 1)',
            //       'rgba(0, 0, 0, 1)'
            //     ],
            //     borderColor: [
            //       'rgba(255, 26, 104, 1)',
            //       'rgba(54, 162, 235, 1)',
            //       'rgba(255, 206, 86, 1)',
            //       'rgba(75, 192, 192, 1)',
            //       'rgba(153, 102, 255, 1)',
            //       'rgba(255, 159, 64, 1)',
            //       'rgba(0, 0, 0, 1)'
            //     ],
            //     barPercentage: 0.4,
            //   }]
            // };
        
            // // config 
            // const config = {
            //   type: 'bar',
            //   data,
            //   options: {
            //     plugins: {
            //         legend: {display: false},
            //     },                
            //     indexAxis: 'y',
            //     scales: {
            //         x: {
            //             ticks: {
            //                 color: 'rgba(255,255,255,0.5)',
            //                 font: {
            //                     family: 'sans-serif',
            //                     size:8,
            //                     weight: '100'
            //                 }
            //             },
            //             grid: {
            //                 display:false
            //             },
            //             min: '2022-11-25 01:00:00',
            //             type: 'time',
            //             time: {
            //                 unit: 'day',
            //                 parser: 'yyyy-MM-dd HH:mm:ss',
            //                 stepSize: 20,
            //                 displayFormats: {
            //                     day: 'yyyy-MM-dd'
            //                 }
            //             }
                        
            //         },
            //       y: {
            //         ticks: {
            //             display: false,
            //             color: 'rgba(255,255,255,0.5)',
            //                 font: {
            //                     size:10
            //                 }
            //             },
            //         grid: {
            //                 display:false
            //             },
            //         beginAtZero: true
            //       }
            //     }
            //   }
            // };
        
            // // render init block
            // const myChart = new Chart(
            //   document.getElementById('myChart'),
            //   config
            // );