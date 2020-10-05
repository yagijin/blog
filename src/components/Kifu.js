import React, {useEffect, useState} from 'react';
import './Kifu.css';
import { JKFPlayer } from 'json-kifu-format';

function Kifu(props) {

  const [player, setPlayer] = useState(null);
  const [shogi, setShogi] = useState(null);
  const [tesuu, setTesuu] = useState(0);

  const max_tesuu = (player===null)?"100":player.kifu.moves.length-1;

  useEffect(()=>{
    let kifu;
    const getKifuData = async ()=>{
      const response = await fetch(props.path,{method: 'GET', headers: {'Content-Type': "text/html;charset=Shift_JIS"}});
      kifu = await response.text();
      console.log(kifu);
      setPlayer(JKFPlayer.parseKIF(kifu));
    };
    getKifuData();
  },[props.path])

  useEffect(()=>{
    if(player!==null){
      setShogi(player.shogi);
    }
  },[player])

  function getBoard(board) {
    const list_r = [];
    for(let j=0;j<9;j++){
      const list_d = [];
      for(let i=8;i>=0;i--){
        if(board[i][j]===null){
          list_d.push(<td className="ban-piece" key={i+":"+j}>{"　"}</td>);
        }else{
          list_d.push(<td className={(board[i][j].color===1)?"ban-piece flip-vertical":"ban-piece"} key={i+":"+j}>{koma(board[i][j].kind)}</td>);
        }
      }
      list_r.push(<tr key={"line:"+j}>{list_d}</tr>);
    }
    return(
      <div className="ban-parent">
        {getTegoma(1)}
        <table border="1" className="ban">
          <tbody>
          {list_r}
          </tbody>
        </table>
        {getTegoma(0)}
      </div>
    );
  }

  function koma(name){
    switch(name){
      case "FU":
        return "歩"
      case "KA":
        return "角"
      case "HI":
        return "飛"
      case "KY":
        return "香"
      case "KE":
        return "桂"
      case "GI":
        return "銀"
      case "KI":
        return "金"
      case "OU":
        return "王"
      case "UM":
        return "馬"
      case "NK":
        return "圭"
      case "TO":
        return "と"
      case "NG":
        return "全"
      case "RY":
        return "龍"
      case "NY":
        return "杏"
      default:
        return name
    }
  }

  function getTegoma(ban){
    let list = [];
    list.push(<li className="koma-icon" key={-1}>{(ban===1)?"☖":"☗"}</li>);

    for(let i=0;i<shogi.hands[ban].length;i++){
      list.push(<li key={i}>{koma(shogi.hands[ban][i].kind)}</li>);
    };
    return (
      <ul className={(ban===1)?"flip-vertical ban-tegoma":"ban-tegoma flip-horizon"}>
        {list}
      </ul>
    );
  }

  function move_koma(value){
    if(value===max_tesuu+1){
      window.alert("ここで投了となりました．");
    }
    player.goto(value);
    setShogi(JSON.parse(JSON.stringify(player.shogi)));
    setTesuu(player.tesuu);
  }

  return (
    <div className="kifu">
      {(shogi!==null)?getBoard(shogi.board):"未取得"}
      <div className="menu-shogi">
        <button onClick={()=>move_koma(0)}>{"<<"}</button>
        <button onClick={()=>move_koma(tesuu-1)}>{"<"}</button>
        <div>
          <input type="range" id="tesuuslider" name="tesuuslider" min="0" max={max_tesuu} value={tesuu} onChange={(e)=>move_koma(e.target.value)} step="1"/>
        </div>
        <button onClick={()=>move_koma(tesuu+1)}>{">"}</button>
        <button onClick={()=>move_koma(max_tesuu)}>{">>"}</button>
      </div>
    </div>
  );
}

export default Kifu;
