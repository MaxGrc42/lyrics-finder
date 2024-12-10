<script setup>
import { jsPDF } from 'jspdf'
import { Document, Packer, Paragraph } from 'docx'

const props = defineProps({
  lyrics: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  }
})

const exportTypes = ['pdf', 'txt', 'docx']
const selectedExport = ref('pdf')

function exportToPDF (lyrics, title) {
  const doc = new jsPDF()
  doc.text(lyrics, 10, 10)
  doc.save(`${title}.pdf`)
}

function exportToTxt (lyrics, title) {
  const blob = new Blob([lyrics], { type: 'text/plain' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `${title}.txt`
  link.click()
}

function exportToDocx (lyrics, title) {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [new Paragraph(lyrics)]
      }
    ]
  })

  Packer.toBlob(doc).then(blob => {
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `${title}.docx`
    link.click()
  })
}

function exportSong (lyrics, title) {
  if (selectedExport.value === 'pdf') {
    exportToPDF(lyrics, title)
  } else if (selectedExport.value === 'txt') {
    exportToTxt(lyrics, title)
  } else if (selectedExport.value === 'docx') {
    exportToDocx(lyrics, title)
  } else {
    console.error('Invalid export type')
  }
}
</script>
<template>
  <p>{{ titlef }}</p>
  <div class="options">
    <p>Type d'export</p>
    <USelect
      class="select"
      v-model="selectedExport"
      :options="exportTypes"
    ></USelect>
  </div>
  <div class="action">
    <UButton class="export" @click="exportSong(lyrics, title)"
      >Exporter</UButton
    >
  </div>
</template>
<style scoped>
.options {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.options p {
  display: flex;
  margin-right: 1%;
  width: 100%;
}

.select {
  width: 20vw;
}

.action {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5vh;
}

.export {
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
