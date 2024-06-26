import { RecursiveComponentBuilder } from 'wiz-ui'
import { RecursiveComponentContext } from 'wiz-ui'

import { IDataFolderStructure, dataFolderStructure } from '../../../data/dataRecursive'
import SampleComponentDirectory from './SampleComponentDirectory'

export default function FileDirectory() {
  const finalResultComment = (data: IDataFolderStructure) => {
    console.log(data)
  }

  return (
    <div className="App">
      <div
        style={{
          width: '500px',
        }}
      >
        <RecursiveComponentContext data={dataFolderStructure}>
          <RecursiveComponentBuilder
            component={SampleComponentDirectory}
            result={finalResultComment}
          />
        </RecursiveComponentContext>
      </div>
    </div>
  )
}
