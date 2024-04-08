import { PropsWithChildren, useContext, useEffect } from 'react'

import {
  IAddItem,
  IDeleteItem,
  IUpdateNodeByPath,
  RecursiveContext,
} from './RecursiveComponentContext'

export interface IRecursiveComponent<T> extends PropsWithChildren {
  data: T
  accessKey: string
  deleteItem: IDeleteItem
  addItem: IAddItem
  updateItem: IUpdateNodeByPath
  parent?: T
}

export const RecursiveComponentBuilder = ({
  data,
  component: Component,
  accessKey = '',
  result,
  parent,
}: any) => {
  const { recursiveData, deleteItem, addItem, updateNodeByPath } = useContext(RecursiveContext)

  const { children, ...otherkeys } = data || recursiveData

  useEffect(() => {
    {
      result && result(recursiveData)
    }
  }, [recursiveData])

  return (
    <>
      <Component
        data={otherkeys}
        accessKey={accessKey}
        deleteItem={() => deleteItem(accessKey)}
        addItem={addItem}
        updateItem={updateNodeByPath}
        parent={parent}
      >
        {children && children.length > 0
          ? children.map((child: any, index: number) => {
              const accessKeyChild = (accessKey ? accessKey + '.' : '') + index
              return (
                <RecursiveComponentBuilder
                  key={index}
                  data={child}
                  accessKey={accessKeyChild}
                  result={result}
                  component={Component}
                  parent={otherkeys}
                />
              )
            })
          : null}
      </Component>
    </>
  )
}
