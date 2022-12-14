import React, { useState, useContext, useEffect } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { motion } from 'framer-motion';

import { GlobalState } from '../App';
import { GlobalFormState } from '../App';
import pptxgen from "pptxgenjs";

let slideArr=[];
export default function Navbar() {


  const { setmaintask, mainTaskList, setMainTaskList } = useContext(GlobalState);
  const { todoInfoList, setTodoInfoList } = useContext(GlobalFormState);



  const downloadPPT=()=>{
    let pres = new pptxgen();
    todoInfoList.map((e,i)=>{
      let tempSlide=pres.addSlide();
      let arrBorder = [[{color: '1166BB'}], [{color: 'CC0000'}], [{color: 'E07700'}], [{color: '009933'}]];
      tempSlide.addText(e.maintask,{
        x: 0,
        y: 0.2,
    })
      let rows = [["sub task", "Assigned date", "Expected date","Completion date","Status","Comment"]];
      tempSlide.addTable(rows, { w: 9,border:arrBorder });
      let subtaskrows=[];
      e.todoinfo.map((row, i)=>{
        subtaskrows.push([row.subtask,row.date1.toString().substring(4, 15),row.date2.toString().substring(4, 15),row.date3.toString().substring(4, 15),row.status,row.comment]);
       
        // adding multiple slide due to addtables
        //tempSlide.addText(row.subtask)
      })
      tempSlide.addTable(subtaskrows, { w: 9,y:i*0.2+1,border:arrBorder  });
      subtaskrows=[];
      
    tempSlide=null;
      //for debug
      //slideArr.push(tempSlide)
    })
    // slideArr.map((e,i)=>{

    //   //add another loop for subtasks
      
      
    //   e.addText("Hello World from PptxGenJS...", {
    //     x: 1.5,
    //     y: 1.5,
    //     color: "363636",
    //     fill: { color: "F1F1F1" },
    //     align: pres.AlignH.center,
    // });
    // })

    //for debug
    //console.log(slideArr)
    pres.writeFile({ fileName: "Sample Presentation.pptx" });
  }
  return (
    <motion.div
      initial={{ y: -250 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5, bounce: false, duration: 1.5 }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="transparent" sx={{ color: 'white' }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>

              Monthly Todo
            </Typography>

            <Button onClick={() => { setmaintask(true) }} sx={{ margin: '0 1rem', fontWeight: 'bold' }} color="inherit">Main Task</Button>
            <Button onClick={() => { setmaintask(false) }} sx={{ margin: '0 1rem', fontWeight: 'bold' }} color="inherit">Sub Task</Button>
            <Button onClick={downloadPPT} sx={{ margin: '0 1rem', fontWeight: 'bold' }} color="inherit">Download ppt</Button>
          </Toolbar>
        </AppBar>
      </Box >
    </motion.div>
  );
}
