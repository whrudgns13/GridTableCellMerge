const $table = this.getDomRef();
                document.querySelectorAll(`.sapUiTableContentRow td[hideCell='true']`).forEach(cell=>{
                  cell.removeAttribute("hideCell")
                })
                document.querySelectorAll(`.sapUiTableContentRow td[rowspan]`).forEach(cell=>{
                  cell.removeAttribute("rowspan")
                });
                cellMerge(1);
                cellMerge(2);
                
                function cellMerge(iIndex){
                  let prevText;
                  let rowSpan;
                  let target;
                  let aApproveCell;
                  let approveTarget;
                  if(iIndex===2){
                    aApproveCell = $table.querySelectorAll(".sapUiTableCtrl tbody .sapUiTableContentRow:not(.sapUiTableRowHidden) td:nth-child(3)")
                  }
                  
                  const aCell = $table.querySelectorAll(".sapUiTableCtrl tbody .sapUiTableContentRow:not(.sapUiTableRowHidden) td:nth-child("+iIndex+")")
                  const aPlantCell = $table.querySelectorAll(".sapUiTableCtrl tbody .sapUiTableContentRow:not(.sapUiTableRowHidden) td:nth-child("+1+")");
                  
                  aCell.forEach((cell,index)=>{
                    const sText = cell.querySelector("span").textContent;
                    const plantCell = aPlantCell[index].querySelector("span").textContent;
                    if(sText && sText===prevText){
                      rowSpan = Number(target.getAttribute("rowspan")) || 1;
                      rowSpan++;
                      target.setAttribute("rowspan",rowSpan);
                      if(approveTarget && plantCell==="계획")approveTarget.setAttribute("rowspan",rowSpan);
                      
                      if(rowSpan>1){
                        cell.setAttribute("hideCell", true);
                        if(aApproveCell && plantCell==="계획")aApproveCell[index].setAttribute("hideCell", true);
                      }
                    }else{
                      prevText = sText;
                      target = cell;
                      if(aApproveCell && plantCell==="계획") approveTarget = aApproveCell[index];
                    }
                  })
                
                }
              }
