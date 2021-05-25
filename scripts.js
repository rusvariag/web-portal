/* -----------------------------------------------------------------------------
Helpers :
----------------------------------------------------------------------------- */
const utils = {
    groupByArray(key) {
        return array => {
            const arr = array.reduce((objectsByKeyValue, obj) => {
              const value = obj[key];
              objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
              return objectsByKeyValue;
            }, {});
            return Object.keys(arr).map((key) => ({section: key, container: arr[key]}));
        }
    }
}
// Will return virtual node. h is commonly used to define virtual nodes.
// The h means hyperscript.
function h(tag, props = {}, children = [] ) {
    if (tag == null || typeof tag !== 'string') {
        throw Error('The tag must be either a string or a component.');
    }
    return { tag, props, children }
}
// Mount a virtual node to the DOM
// param : vnode is what we want to mount and container is where we want to mount it
function mount(vnode, container) {
    const el = document.createElement(vnode.tag);
    // Add event listeners
    const isEvent = name => name.startsWith('on');
    Object.keys(vnode.props).filter(isEvent).forEach(name => {
        const eventType = name.toLowerCase().substring(2);
        el.addEventListener(eventType, vnode.props[name]);
    });
    // Set properties
    const isAttribute = name => !isEvent(name) && name != "children";
    Object.keys(vnode.props).filter(isAttribute).forEach(name => {
        el.setAttribute(name, vnode.props[name]);
    });
    if (typeof vnode.children !== 'object') {
        el.textContent = vnode.children;
    } else {
        vnode.children.forEach(child => {
            mount(child, el);
        });
    }
    container.appendChild(el);
}
/* -----------------------------------------------------------------------------
Services :
----------------------------------------------------------------------------- */
class Services {
    constructor() {
        this.url = {
            announceUrl: `https://jsonplaceholder.typicode.com/todos/1`,
            systemsUrl: `https://jsonplaceholder.typicode.com/todos/1`,
            sectionsUrl: `https://jsonplaceholder.typicode.com/todos/1`,
            riskDataUrl: `https://jsonplaceholder.typicode.com/todos/1`,
            returnsUrl: `https://jsonplaceholder.typicode.com/todos/1`,
            userUrl: `https://jsonplaceholder.typicode.com/todos/1`,
        };
        this.headers = {
            "Accept":"application/json",
            "IF-MATCH":"*"
        };
    }
    async getAnnouncements() {
        const res = await this.fetchData(this.url.announceUrl);
        return  [
            '01/04/2015: איזה השקעה',
            '05/04/2016: איזה הודעה גרוע',
            '08/12/2019: סתם ממשלה',
        ]
    }
    async getSystemsList() {
        const res = await this.fetchData(this.url.systemsUrl);
        return [
            {
                title: 'מערכת 1',
                link: 'https://www.google.com',
                section: 1,
                sort: 1,
            },
            {
                title: 'מערכת 2',
                link: 'https://www.google.com',
                section: 1,
                sort: 2,
            },
            {
                title: 'מערכת 3',
                link: 'https://www.google.com',
                section: 1,
                sort: 3,
            },
            {
                title: 'מערכת 4',
                link: 'https://www.google.com',
                section: 1,
                sort: 4,
            },
            {
                title: 'Blizzard',
                link: 'https://www.google.com',
                section: 2,
                sort: 1,
            },
            {
                title: 'Super Mario 2',
                link: 'https://www.google.com',
                section: 3,
                sort: 1,
            },
            {
                title: 'Tekken 4',
                link: 'https://www.google.com',
                section: 3,
                sort: 2,
            },
            {
                title: 'StarCraft',
                link: 'https://www.google.com',
                section: 3,
                sort: 3,
            },
        ]
    }
    async getSectionsList() {
        const res = await this.fetchData(this.url.sectionsUrl);
        return [
            {section: "תחומים",  title: "מניות",               icon: ["las", "la-balance-scale-right"],   sort: 1,    value: 1},
            {section: "כללי",    title: "מרכזי חוב בעייתי",    icon: ["las", "la-balance-scale-right"],  sort: 1,    value: 10},
            {section: "תחומים",  title: 'אג"ח',                icon: ["las", "la-balance-scale-right"],   sort: 2,    value: 2},
            {section: "כללי",    title: "טפסי הקמה",           icon: ["las", "la-balance-scale-right"],   sort: 2,    value: 7},
            {section: "תחומים",  title: "בקרה",                icon: ["las", "la-balance-scale-right"],   sort: 3,    value: 3},
            {section: "כללי",    title: "נהלים",               icon: ["las", "la-balance-scale-right"],   sort: 3,    link: "https://www.google.com"},
            {section: "תחומים",  title: "אשראי",               icon: ["las", "la-balance-scale-right"],   sort: 4,    value: 4},
            {section: "כללי",    title: "ספר טלפונים",         icon: ["las", "la-balance-scale-right"],   sort: 4,    link: "https://www.google.com"},
            {section: "תחומים",  title: "קרנית",               icon: ["las", "la-balance-scale-right"],   sort: 5,    value: 5},
            {section: "תחומים",  title: "מאקרו",               icon: ["las", "la-balance-scale-right"],   sort: 6,    value: 6},
        ]
    }
    async getRiskData() {
        const res = await this.fetchData(this.url.riskDataUrl);
        return [
            {
                title: 'נכסים',
                icon: 'las la-chart-line',
                value: parseFloat(100).toFixed(2),
                remark: 'מיליארדי ש"ח',
            },
            {
                title: 'התחייבויות',
                icon: 'las la-info',
                value: parseFloat(105).toFixed(2),
                remark: 'מיליארדי ש"ח',
            },
            {
                title: 'גירעון לפני כרית',
                icon: 'las la-broadcast-tower',
                value: parseFloat(5).toFixed(2),
                remark: 'גרעון אחרי כרית - ' + parseFloat(0).toFixed(2),
            },
            {
                title: '% ניצול כרית',
                icon: 'las la-percent',
                value: parseFloat(0.125).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:2}),
                remark: 'תקרת כרית : ' + parseFloat(40).toFixed(2),
            }
        ];
    }
    async getReturns() {
        const res = await this.fetchData(this.url.returnsUrl);
        return {
            cumulate: [
                {date: 'תחילת שנה', portfolio: 0, benchmark: 0},
                {date: '01/2000', portfolio: '1.12%', benchmark: '1.52%'},
                {date: '02/2000', portfolio: '2.02%', benchmark: '2.13%'},
                {date: '03/2000', portfolio: '4.07%', benchmark: '3.54%'},
                {date: '04/2000', portfolio: '3.02%', benchmark: '1.89%'},
                {date: '05/2000', portfolio: '0.02%', benchmark: '-0.52%'},
            ],
            monthly: [
                {date: 'תחילת שנה', portfolio: 0, benchmark: 0},
                {date: '01/2000', portfolio: '1.02%', benchmark: '1.52%'},
                {date: '02/2000', portfolio: '1.54%', benchmark: '1.12%'},
                {date: '03/2000', portfolio: '2.12%', benchmark: '2.00%'},
                {date: '04/2000', portfolio: '-1.02%', benchmark: '-1.85%'},
                {date: '05/2000', portfolio: '-2.84%', benchmark: '-3.12%'},
            ]
        };
    }
    async fetchData(url) {
        return (await fetch(url, {
            method: 'GET',
            mode: 'cors',
            headers: this.headers
        })).json();
    }
    async getUser() {
        const res = await this.fetchData(this.url.userUrl);
        return 'user@email.com';
    }
}
// start instances
const apiConnection = new Services();
/* -----------------------------------------------------------------------------
State :
----------------------------------------------------------------------------- */
const state = {
    news: [],
    section: 1,
    sections: [],
    risk: [],
    systems: [],
    returns: {
        cumulate: [],
        monthly: []
    },
    systemHeader: 'מערכות וקישורים',
}
/* -----------------------------------------------------------------------------
Builders :
----------------------------------------------------------------------------- */
const buildSystemsList = (data) => {
    // props process
    data.sort((a, b) => a.sort - b.sort);
    const section = state.sections.filter(e => e.value == state.section);
    // get the container
    const container = document.querySelector('.main');
    // clean container
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    // create node
    const node = h('div', {}, [
        h('h4', {class: "container-headers"}, `${state.systemHeader} - ${section[0]['title']}`),
        h('div', {class: 'main-container'}, data.map(item => {
            return h('div', {class: 'row container_rounded'}, [
                h('div', {class: 'indicator'}, []),
                h('a', {href: item.link, target: '_blank', class: 'content heebo'}, item.title),
            ]);
        })),
    ]);
    // Append to document
    mount(node, container)
}
const buildReturnTable = (data) => {
    // get the container
    const container = document.querySelector('.table-container');
    // clean container
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    // create node
    const node = h('table', {class: 'table-component container-shadowed container_rounded background_secondary'}, [
        h('thead', {class: 'table-head'}, [
            h('tr', {class: 'table-head__row text-m'}, [
                h('th', {class: 'table-head__cell'}, 'חודש'),
                h('th', {class: 'table-head__cell'}, 'תשואת תיק'),
                h('th', {class: 'table-head__cell'}, 'תשואת מדד ייחוס'),
            ]),
        ]),
        h('tbody', {class: 'table-body'}, data.map(item => {
            return h('tr', {class: 'table-body__row', dir: 'ltr'}, [
                h('td', {class: 'table-body__cell'}, item.date),
                h('td', {class: 'table-body__cell'}, [
                    h('span', {class: 'table-body__cell_text'}, item.portfolio),
                ]),
                h('td', {class: 'table-body__cell'}, [
                    h('span', {class: 'table-body__cell_text'}, item.benchmark),
                ]),
            ]);
        })),
    ]);
    // Append to document
    mount(node, container)
}
const buildSections = (data) => {
    // get the container
    const container =  document.querySelector('.panels');
    // clean container
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    // create node
    for (let i = 0; i < 4; i++) {
        const value = data[i];
        // Create html
        const node = h('div', {class: 'card container-wrapper container-shadowed container-spaced'}, [
                h('div', {class: 'header-icon header-icon_direction_left container-spaced'}, [
                    h('div', {class: 'header-icon__text container-centralize text-l rubik'}, value.title),
                    h('div', {class: 'header-icon__icon container-centralize text-extreme'}, [
                        h('span', {class: `${value.icon} `}, '')
                    ]),
                ]),
                h('div', {class: 'card__body text-extreme'}, value.value),
                h('div', {class: 'card__remark text-xs'}, value.remark || 's'),
            ]);
        // Append to document
        mount(node, container);
    }
}
const buildSidebar = (data) => {
    // please see next url for icons : https://icons8.com/line-awesome
    const container =  document.querySelector('.navigation');
    // define events
    const onClick = e => {
        const toggle = document.querySelector('#land-page-toggle');
        toggle.checked = true;
        if ( window.innerWidth < 768) {
            document.querySelector('#menu-toggle').checked = false;
        }
        if (morris) {
            morris.resizeHandler();
        }
        if (e.target.nodeName === 'LI') {
            const value = e.target.getAttribute('name');
            state.section = value;
            const arr = state.systems.filter(item => {
                return item.section == value
            });
            buildSystemsList(arr);
        }
    }
    // create node
    const node = h('div', {class: 'menu-block', onClick: onClick}, [
        ...data.map(section => [
            h('div', {class: 'menu-head text-m'}, section.section),
            h('ul', {class: 'menu-list'}, section.container.map(item => {
                if (item.hasOwnProperty('link')) {
                    return h('li', {class: 'text-m'}, [
                        h('a', {href: item.link}, [
                            h('span', {class: item.icon.join(' ')}, []),
                            h('span', {}, item.title),
                        ]),
                    ]);
                } else {
                    return h('li', {name: item.value, class: 'text-m'}, [
                        h('span', {class: item.icon.join(' ')}, []),
                        h('span', {}, item.title),
                    ]);
                }
            }))
        ]).reduce((acc, val) => acc.concat(val), []),
    ]);
    // Append to document
    mount(node, container);
}
const buildGraph = (cumulate) => {
    // Build the graph
    window.morris = new Morris.Line({
      // ID of the element in which to draw the chart.
      element: 'returnChart',
      // Chart data records -- each entry in this array corresponds to a point on
      // the chart.
      data: cumulate,
      // The name of the data record attribute that contains x-values.
      xkey: 'date',
      // A list of names of data record attributes that contain y-values.
      ykeys: ['portfolio', 'benchmark'],
      // Labels for the ykeys -- will be displayed when you hover over the
      // chart.
      labels: ['תשואת תיק', 'תשואת מדד ייחוס'],
      // Color of the line on the chart
      lineColors: ['goldenrod', '#6AA121'],
      parseTime: false,
      postUnits: '%',
      xLabelAngle: 45,
      resize: true,
      hideHover: false
    });
}
/* -----------------------------------------------------------------------------
Main entry :
----------------------------------------------------------------------------- */
// Run code after load in finished
document.addEventListener('DOMContentLoaded', function() {
    // Build news feed element
    apiConnection.getAnnouncements().then(data => {
        const newsFeed = document.querySelector('.news-feed-text p');
        newsFeed.textContent = data.join(` | `);
    });
    // Build sidebar section
    apiConnection.getSectionsList().then(data => {
        data.sort((a, b) => a.sort - b.sort);
        const groupBySection = utils.groupByArray('section');
        const newData = groupBySection(data);
        state.sections = data;
        buildSidebar(newData);
        // Build system list
        apiConnection.getSystemsList().then(data => {
            state.systems.push(...data);
            const initualData = data.filter(item => item.section === state.section);
            buildSystemsList(initualData);
        });
    });
    // Build risk data section
    apiConnection.getRiskData().then(data => {
        buildSections(data);
    });
    // Build return section
    apiConnection.getReturns().then(data => {
        state.returns = data;
        buildReturnTable(data.monthly);
        buildGraph(data.cumulate);
    });
    apiConnection.getUser().then(data => {

    });
    // Build the Titles - because i have some problem with 'Atom' and UTF-8 hebrew support in html
    (function() {
        const newsFeed = document.querySelector('.news-feed-header');
        newsFeed.innerText = 'עדכונים';
        const brand = document.querySelector('.brand__title');
        brand.innerText = 'חטיבת השקעות';
        const chartTitle = document.querySelector('.chart__title');
        chartTitle.innerText = 'ביצועים מצטברים';
        const tableTitle = document.querySelector('.table__title');
        tableTitle.innerText = 'ביצועים חודשיים';
        const portfolio = document.querySelector('.portfolio__title');
        portfolio.innerText = 'פורטפוליו';
        const landPageSubTitle = document.querySelector('.land-page__subtitle');
        landPageSubTitle.innerText = 'בקרה וניתוח השקעות';

        const w = window.innerWidth;
        if (w < 768) {
            document.querySelector('#land-page-toggle').checked = true;
        }
    })();
    // add global events
    document.querySelector('#menu-toggle').addEventListener('change', e => {
        if (morris) {
            morris.resizeHandler();
        }
    })
});

// Animation JS
const elements = document.querySelectorAll('.el');
anime({
  targets: elements,
  scale: [
    {value: .1, easing: 'easeOutSine', duration: 800},
    {value: 1, easing: 'easeInOutQuad', duration: 1500}
  ],
  delay: anime.stagger(500, {grid: [4, 4], from: 'center'}),
  loop: true
});
