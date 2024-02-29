import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import { IColumnTree, ITreeItem } from './TreeExplorerModel';

type Props = {
  data: ITreeItem[];
  columns: IColumnTree[];
  handleDoubleClick?: () => void;
  alwaysOpen?: boolean;
  handleContextMenu?: (e: any, row: any) => void;
}

const TreeExplorer = ({ data, columns, handleDoubleClick, alwaysOpen, handleContextMenu }: Props) => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  useEffect(() => {
    if (alwaysOpen) {
      const allNames = data.flatMap(item => getAllNodeNames(item));
      setOpenItems(allNames);
    }
  }, [data, alwaysOpen]);

  const getAllNodeNames = (item: any): string[] => {
    let names: string[] = [item[columns[0].field]];
    if (item?.children) {
      names = [...names, ...item.children.flatMap((child : any) => getAllNodeNames(child))];
    }
    return names;
  };

  const handleToggle = (name: string, isOpen: boolean) => {
    setOpenItems((prevOpenNodes) =>
      isOpen ? [...prevOpenNodes, name] : prevOpenNodes.filter((nodeName) => nodeName !== name)
    );
  };

  const handleCustomContextMenu = (e: any, row: any) => {
    e.preventDefault();
    handleContextMenu && handleContextMenu(e, row);
  };

  const renderTree = (item: any, index: number, khoangCach = 0) => {
    const key = item[columns[0].field];
    const isOpen = openItems.includes(key);
    
    return (
      <React.Fragment key={key}>
        <tr onContextMenu={(e) => handleCustomContextMenu(e, item)}>
          <td
            style={{ textIndent: !alwaysOpen ? `${khoangCach * 10}px` : "0" }}
            onClick={() => handleToggle(key, !isOpen)}
          >
            {(item?.children && item?.children?.length > 0)
              ? <span>{alwaysOpen ? `${index + 1}. ` : isOpen ? '-' : '+'}</span>
              : "-"} {item[columns[0]?.field]}
          </td>
          {columns?.slice(1).map((column, index) => (
            column?.render
              ? <td key={index} className={column?.cellStyles}>
                {column?.render(item, index) || ""}
              </td>
              : <td key={index} className={column?.cellStyles}>
                {item[column?.field] || ""}
              </td>
          ))}
        </tr>
        {(item?.children && isOpen) && item?.children?.map((child: any) => renderTree(child, index, khoangCach + 1))}
      </React.Fragment>
    );
  };

  return (
    <Table className="table align-middle table-row-dashed fs-6 dataTable no-footer">
      <thead className="header-sticky">
        <tr className="fw-bolder fs-7 text-uppercase gs-0 border bg-pri">
          {
            columns?.map((column) => (
              <th className={`text-uppercase fs-6 fw-bold cursor-pointer bg-pri text-center py-2 ${column?.className || ""}`}>
                {column?.title}
              </th>
            ))
          }
        </tr>
      </thead>
      <tbody onDoubleClick={handleDoubleClick}>
        {data?.map((item, index) => (
          renderTree(item, index)
        ))}
      </tbody>
    </Table>
  )
}

export default TreeExplorer