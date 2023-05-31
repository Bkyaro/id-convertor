import React, { useState, useEffect } from "react";
import Empty from "./empty";
import { CBS110 } from "../coordinate/cbs110";
import { SLK111ZS } from "../coordinate/slk111zs";
import { XHD083 } from "../coordinate/xhd083";

const Card = ({ index, onInputChange, onDeleteCard, insert }) => {
  const [inputItems, setInputItems] = useState({
    main: [
      { name: "主产品sku", key: "mainSku", insert: "" },
      { name: "追销sku", key: "relatedSku", insert: "" },
      { name: "追销变体id", key: "virtualId", insert: "" },
      { name: "售价", key: "price", insert: "" },
      { name: "原价", key: "originalPrice", insert: "" },
      { name: "主图", key: "featuredImage", insert: "" },
      { name: "标题", key: "title", insert: "" },
    ],
    giftBox1: [
      { name: "礼盒1sku", key: "giftBox1_sku", insert: "" },
      { name: "礼盒1变体id", key: "giftBox1_variantId", insert: "" },
      { name: "礼盒1标题", key: "giftBox1_title", insert: "" },
      { name: "礼盒1描述", key: "giftBox1_description", insert: "" },
      { name: "礼盒1售价", key: "giftBox1_price", insert: "" },
      { name: "礼盒1图片", key: "giftBox1_thumbnail", insert: "" },
    ],
    giftBox2: [
      { name: "礼盒2sku", key: "giftBox2_sku", insert: "" },
      { name: "礼盒2变体id", key: "giftBox2_variantId", insert: "" },
      { name: "礼盒2标题", key: "giftBox2_title", insert: "" },
      { name: "礼盒2描述", key: "giftBox2_description", insert: "" },
      { name: "礼盒2售价", key: "giftBox2_price", insert: "" },
      { name: "礼盒2图片", key: "giftBox2_thumbnail", insert: "" },
    ],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onInputChange(index, name, value);
  };

  const handleDeleteCard = () => {
    onDeleteCard(index);
  };

  const handleCandidateClick = (e) => {
    e.preventDefault();
    const { innerText, parentNode } = e.target;
    handleSelectChange(inputItems, parentNode.id, innerText);

    onInputChange(index, parentNode.id, innerText);

  };

  const handleSelectChange = (structure, target, insert) => {
    const mainData = [];
    const giftBox1Data = [];
    const giftBox2Data = [];
    structure.main.map((item) => {
      mainData.push(item.key);
      return true;
    });
    structure.giftBox1.map((item) => {
      giftBox1Data.push(item.key);
      return true;
    });
    structure.giftBox2.map((item) => {
      giftBox2Data.push(item.key);
      return true;
    });

    if (mainData.indexOf(target) >= 0) {
      structure.main.map((item) => {
        if (item.key === target) {
          item.insert = insert;
        }
        return true;
      });
      setInputItems(structure);
      return insert;
    }

    if (giftBox1Data.indexOf(target) >= 0) {
      structure.giftBox1.map((item) => {
        if (item.key === target) {
          item.insert = insert;
        }
        return true;
      });
      setInputItems(structure);
      return insert;
    }

    if (giftBox2Data.indexOf(target) >= 0) {
      structure.giftBox2.map((item) => {
        if (item.key === target) {
          item.insert = insert;
        }
        return true;
      });
      setInputItems(structure);
      return insert;
    }
  };

  const inputSnippet = (items) => {
    const renderCandidates = (type) => {
      switch (type) {
        //主产品sku 候选
        case "mainSku":
          return [
            "SKL111",
            "XHD083",
            "CBS110",
            "Kit-11281",
            "Kit-11281TZ",
            "XHD083A",
            "CBS110A",
            "Kit-1187",
            "Kit-1189",
            "XHD1954",
            "XHD083A",
            "XHD083X01",
            "XHD083X02",
            "XHD083X03",
            "XHD083X04",
            "XHD083X05",
          ];
        //追销sku 候选
        case "relatedSku":
          return ["CBS110", "SKL111ZS", "XHD083", "Kit-11281"];
        //礼盒1sku 候选
        case "giftBox1_sku":
          return [
            "CSQR4549",
            "BOX_49",
            "BOX_50",
            "BOX_51",
            "BOX_52",
            "BOX_56",
            "BOX_58",
            "BOX_59",
          ];
        //礼盒2sku 候选
        case "giftBox2_sku":
          return [
            "CSQR4549",
            "BOX_49",
            "BOX_50",
            "BOX_51",
            "BOX_52",
            "BOX_56",
            "BOX_58",
            "BOX_59",
          ];
        default:
          return [];
      }
    };

    const candidates = renderCandidates(items.key);
    const ifCandidates = Boolean(candidates.length);

    return (
      <>
        <div>
          <div className="form__group field relative">
            <input
              list="mainSku"
              id={`${items.key}`}
              type="input"
              className="form__field text-red peer"
              placeholder={`${items.name}`}
              required
              name={`${items.key}`}
              onChange={handleInputChange}
              defaultValue={`${items.insert}`}
              autoComplete="off"
            />

            {ifCandidates && (
              <div
                className="candidate-shadow px-2 no-scrollbar bg-gradient-to-r from-[#116399] to-[#38caef] z-30 absolute border-none h-0 bg-slate-400 w-full  overflow-hidden transition-all duration-200 peer-focus:h-[200px] rounded-b-md peer-focus:min-h-full peer-focus:overflow-y-scroll flex flex-col"
                id={`${items.key}`}
              >
                {candidates.map((item) => {
                  return (
                    <div
                      className="cursor-pointer px-1 py-1 text-white w-full bg-yellow z-31"
                      onClick={handleCandidateClick}
                    >
                      {item}
                    </div>
                  );
                })}
              </div>
            )}
            <label htmlFor="name" className="form__label">
              {`${items.name}`}
            </label>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="bg-slate-200 shadow-sm flex flex-wrap p-4 gap-2 rounded group transition-all">
      <div className="relative flex flex-wrap items-center justify-center ">
        <button
          className="opacity-0 cursor-none pointer-events-none group-hover:cursor-pointer group-hover:pointer-events-auto group-hover:opacity-100 text-white absolute -left-7 -top-7 bg-red-500 hover:scale-105 transition-all rounded-full  h-7 w-7"
          onClick={handleDeleteCard}
        >
          X
        </button>
        <div className="flex flex-col items-center justify-center h-full">
          <div className="flex flex-wrap gap-4">
            {inputItems?.main &&
              inputItems.main.map((item) => {
                return inputSnippet(item);
              })}
          </div>
          <div className="w-full h-1 my-2 bg-gradient-to-l from-transparent via-slate-400 to-transparent"></div>
          <div className="relative flex gap-2 min-h-max w-full justify-center items-center">
            <div className="flex flex-wrap gap-2 w-[49%]">
              {inputItems?.giftBox1 &&
                inputItems.giftBox1.map((item) => {
                  return inputSnippet(item);
                })}
            </div>
            <div className="bg-gradient-to-b from-transparent via-slate-400 to-transparent w-1 h-full"></div>
            <div className="flex flex-wrap gap-2 w-[49%]">
              {inputItems?.giftBox2 &&
                inputItems.giftBox2.map((item) => {
                  return inputSnippet(item);
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CardContainer = () => {
  const [cards, setCards] = useState([]);
  const [jsonData, setJsonData] = useState(null);
  const [isEmpty, setIsEmpty] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const [warning, setWarning] = useState(false);
  const [showOperator, setShowOperator] = useState(true);
  const [defaultWarning, setDefaultWarning] = useState(false);
  const [copyButton, setCopyButton] = useState("复制");

  useEffect(() => {
    if (showResult) {
      hideOperatorButtons();
    }
  }, [showResult]);

  const hideOperatorButtons = () => {
    setShowOperator(false);
  };

  const addCard = () => {
    setIsEmpty(false);
    setShowResult(false);
    const newIndex = cards.length + 1;

    const newCard = {
      index: newIndex,
    };
    setCards([...cards, newCard]);
  };

  const handleInputChange = (index, name, value) => {
    const updatedCards = [...cards];
    updatedCards[index - 1][name] = value;
    setCards(updatedCards);
  };

  const handleDeleteCard = (index) => {
    const updatedCards = cards.filter((card) => card.index !== index);
    setCards(updatedCards);
    if (!updatedCards.length) {
      setIsEmpty(true);
    }
  };

  const checkInputStatus = () => {
    let checkArr = [];
    document.querySelectorAll("input").forEach((item) => {
      if (!item.value) {
        checkArr.push("miss");
      }
    });
    return checkArr;
  };

  const jsonTemplate = (sortedData) => {
    const cookedData = [];

    // 根据sku生成对应坐标
    const generateCoordinate = (sku) => {
      switch (sku) {
        case "SLK111ZS":
        case "SLK111":
          return SLK111ZS;
        case "CBS110":
          return CBS110;
        case "XHD083":
          return XHD083;
        default:
          setDefaultWarning(true);
          return {
            ERROR: "未知的追销产品坐标，请手动更新该字段",
          };
      }
    };

    // eslint-disable-next-line array-callback-return
    sortedData.map((item) => {
      cookedData.push({
        mainSku: `${item.mainSku}`,
        sku: `${item.relatedSku}`,
        ...generateCoordinate(item.relatedSku),
        price: Number(item.price),
        originalPrice: Number(item.originalPrice),
        discount:
          Math.floor((Number(item.price) / Number(item.originalPrice)) * 100) +
          "%",
        virtualId: `${item.virtualId}`,

        featuredImage: item.featuredImage,
        title: item.title,
        giftBox: {
          exclusive: {
            sku: item.giftBox1_sku,
            variantId: item.giftBox1_variantId,
            title: item.giftBox1_title,
            description: item.giftBox1_description,
            price: Number(item.giftBox1_price),
            thumbnail: item.giftBox1_thumbnail,
          },
          general: {
            sku: item.giftBox2_sku,
            variantId: item.giftBox2_variantId,
            title: item.giftBox2_title,
            description: item.giftBox2_description,
            price: Number(item.giftBox2_price),
            thumbnail: item.giftBox2_thumbnail,
          },
        },
      });
    });

    return JSON.stringify(cookedData, null, 2);
  };

  const generateJson = () => {
    const fullyFill = checkInputStatus();
    if (fullyFill.length) {
      setShowOperator(false);
      setWarning(true);
    } else {
      const result = jsonTemplate(cards);
      setJsonData(result);
      setShowResult(true);
    }
  };

  const closeResult = () => {
    setCopyButton("复制");
    setShowOperator(true);
    setShowResult(false);
  };

  const copyResult = async () => {
    try {
      await navigator.clipboard.writeText(jsonData).then(() => {
        setCopyButton("已复制");
      });
    } catch (err) {
      setCopyButton("复制失败");
      console.error("Failed to copy: ", err);
    }
  };

  const handleAcknowledge = () => {
    setDefaultWarning(false);
    setShowOperator(true);
    setWarning(false);
  };
  const handleMissAcknowledge = () => {
    setDefaultWarning(false);
    setWarning(false);
  };

  return (
    <>
      {isEmpty && <Empty />}
      <>
        <div className="fixed bottom-4 flex gap-9 z-10">
          {showOperator && (
            <>
              <button
                className=" text-white bg-slate-500  p-2 hover:scale-105 transition-all rounded shadow-md shadow-white"
                onClick={addCard}
              >
                添加绑定关系
              </button>
              {!isEmpty && (
                <button
                  className="text-white bg-slate-500  p-2 hover:scale-105 transition-all rounded shadow-md shadow-white"
                  onClick={generateJson}
                  disabled={cards.length === 0}
                >
                  生成JSON
                </button>
              )}
            </>
          )}
        </div>
        <div className="flex gap-4 flex-wrap justify-center items-center">
          {cards.map((card, index) => (
            <Card
              key={card.index}
              index={card.index}
              onInputChange={handleInputChange}
              onDeleteCard={handleDeleteCard}
              insert={card.insertValue}
            />
          ))}
        </div>
        {showResult && (
          <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
            <div className="absolute top-6 flex gap-3">
              <button
                className=" text-white bg-slate-500 shadow-sm p-2 hover:scale-105 transition-all rounded"
                onClick={copyResult}
                disabled={cards.length === 0}
              >
                {copyButton}
              </button>
              <button
                className=" text-white bg-slate-500 shadow-sm p-2 hover:scale-105 transition-all rounded"
                onClick={closeResult}
                disabled={cards.length === 0}
              >
                关闭
              </button>
            </div>
            <textarea
              className="glowing h-4/5 w-3/4"
              defaultValue={jsonData}
            ></textarea>
          </div>
        )}
        {warning && (
          <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
            <div className="glowing_warning h-20 w-[160px] flex items-center justify-center bg-white rounded relative group">
              <p className="opacity-100 group-hover:hidden group-hover:opacity-0 ">
                👊请填写完整数据👊
              </p>
              <button
                className="absolute opacity-0 cursor-none pointer-events-none group-hover:cursor-pointer group-hover:pointer-events-auto group-hover:opacity-100  h-full w-full"
                onClick={handleAcknowledge}
              >
                👌收到👌
              </button>
            </div>
          </div>
        )}
        {defaultWarning && (
          <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-20">
            <div className="glowing_warning h-28 w-[192px] flex items-center justify-center bg-white rounded relative group">
              <p className="opacity-100 group-hover:hidden group-hover:opacity-0 ">
                😭追销产品坐标未记录，已输出除坐标外的数据，请留意坐标字段，并手动更新😭
              </p>
              <button
                className="absolute opacity-0 cursor-none pointer-events-none group-hover:cursor-pointer group-hover:pointer-events-auto group-hover:opacity-100  h-full w-full"
                onClick={handleMissAcknowledge}
              >
                👌收到👌
              </button>
            </div>
          </div>
        )}
      </>
    </>
  );
};

export default CardContainer;
