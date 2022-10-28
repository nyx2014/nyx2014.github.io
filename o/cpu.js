
const workerMap = {}

function startCpuTest(ele) {
    console.log(ele.value)

    if (ele.value === 'Start') {
        cpuStart()
        ele.value = 'Stop'
    } else {
        cpuStop()
        ele.value = 'Stop'
    }

}

const workerCount = 12


function cpuStart() {
    const results = document.getElementById('tag-results')
    for (let i = 0; i < workerCount; i ++) {
        const worker = new Worker(`./cpu-worker.js?${Math.random()}`)
        worker.addEventListener('message', (v) => {
            document.getElementById(`worker-result-${i}`).innerText = `线程 ${i}: 运行次数 ${v.data}`
        })
        workerMap[`worker${i}`] = worker
    }



    Array.from({length: workerCount}).map((v, index) => {
        const tag = document.createElement('p')
        tag.setAttribute('id', `worker-result-${index}`)
        tag.innerText = `线程 ${index}: `
        return tag
    }).forEach(t => {
        results.appendChild(t)
    })
}

function cpuStop() {
    Object.keys(workerMap).forEach(key => {
        workerMap[key].terminate()
    })
}