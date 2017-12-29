const markdownTemplate = (service, uri) => {
  return `![${service}](${uri} "${service}")`
}
const htmlTemplate = (service, uri) => {
  return `<img src="${uri}" alt="${service}" />`
}
const getAllServices = (parent, ancestor = []) => {
  let services = []
  Object.keys(parent).forEach(serviceName => {
    if (parent[serviceName].Template) {
      services.push([ancestor, serviceName])
    } else {
      services = services.concat(getAllServices(parent[serviceName], ancestor.concat([serviceName])))
    }
  })
  return services
}
const app = new Vue({
  el: '#app',
  data: {
    Services: {
      CircleCi: {
        Name: 'CircleCi',
        VCS: 'github',
        Username: 'ZeroDragon',
        Repository: 'Catalepsy',
        Branch: '',
        Template: ['VCS','Username','Repository','optional:Branch'],
        Display: '',
        Markdown : '',
        HTML: ''
      },
      CodeCov: {
        Name: 'CodeCov',
        VCS: 'github',
        Username: 'ZeroDragon',
        Repository: 'Catalepsy',
        Branch: '',
        Template: ['VCS','Username','Repository','optional:Branch'],
        Display: '',
        Markdown : '',
        HTML: ''
      },
      Github: {
        lastCommit: {
          Name: 'Github',
          Section: 'last-commit',
          Username: 'ZeroDragon',
          Repository: 'Catalepsy',
          Branch: '',
          Template: ['Section','Username','Repository','optional:Branch'],
          Display: '',
          Markdown : '',
          HTML: ''
        }
      },
      Npm: {
        Version: {
          Name: 'Npm',
          Section: 'version',
          Repository: 'Catalepsy',
          Template: ['Section','Repository'],
          Display: '',
          Markdown: '',
          HTML: ''
        },
        License: {
          Name: 'Npm',
          Section: 'license',
          Repository: 'Catalepsy',
          Template: ['Section','Repository'],
          Display: '',
          Markdown: '',
          HTML: ''
        },
        Downloads: {
          Name: 'Npm',
          Section: 'downloads',
          Repository: 'Catalepsy',
          Template: ['Section','Repository'],
          Display: '',
          Markdown: '',
          HTML: ''
        }
      },
      Custom: {
        Name: 'Custom',
        LeftText: 'Left',
        RightText: 'Right',
        LeftColor: 'aa66ff',
        RightColor: 'ffaa66',
        Template: ['LeftText','RightText','LeftColor-RightColor'],
        Display: '',
        Markdown: '',
        HTML: ''
      }
    }
  },
  methods: {
    generate ([trace, serviceKey]) {
      const data = JSON.parse(JSON.stringify(
        trace.reduce((acum, actual) => {
          return acum[actual]
        },this.Services)[serviceKey]
      ))
      const imageUrl = [ url, data.Name ]
      data.Template.forEach(key => {
        if (key.indexOf('optional:') !== -1){
          const [, gKey] = key.split(':')
          if (data[gKey] !== '') imageUrl.push(data[gKey])
        } else if (key.indexOf('-') !== -1) {
          const [lc, rc] = key.split('-')
          let colors = `${data[lc]}-${data[rc]}`
          if (colors !== '-') imageUrl.push(colors)
        } else {
          imageUrl.push(data[key])
        }
      })
      data.Display = `${imageUrl.join('/')}.svg`
      const section = data.Section ? ` ${data.Section.replace(/\-/g,' ')}` : ''
      const alt = `${data.Name}${section}`
      data.Markdown = markdownTemplate(alt, data.Display)
      data.HTML = htmlTemplate(alt, data.Display)
      trace.reduce((acum, actual) => {
        return acum[actual]
      },this.Services)[serviceKey] = data
    }
  },
  created: function (){
    getAllServices(this.Services).forEach(service => {
      this.generate(service)
    })
  }
})