import React, { Component } from 'react';
import { Progress} from 'semantic-ui-react'

const ProgressBar = ({uploadState, precentUploaded}) => (
    uploadState === 'uploading' && (
        <Progress 
        className="progress__bar"
        percent={precentUploaded}
        progress
        inverted
        indicating
        size="medium"
        />

    )
)
   


export default ProgressBar;