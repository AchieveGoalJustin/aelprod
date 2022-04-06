import React, { useState } from 'react'
import { Document, Page } from 'react-pdf'

const PdfViewer = () => {

    const [numPage, setNumPage] = useState(null)
    const [pageNumber, setPageNumber] = useState(1)

    const onDocumentLoadSuccess = ({ numPage }) => {
        setNumPage(numPage)
        setPageNumber(1)
    }

    return (
        <Document file='/PDFs/sample.pdf' onLoadSuccess={onDocumentLoadSuccess}>
            <Page height="600" pageNumber={pageNumber}>
            </Page>
        </Document>
    )
}

export default PdfViewer