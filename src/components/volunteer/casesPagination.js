import React from 'react';
import {Pagination } from 'react-bootstrap';

class CasesPagination extends React.Component {
    render(){
        for(let i=0;i<4;i++){
            return(
                <Pagination>
                    {this.props.data.currentPageNumber !==0 ?
                    <Pagination.Prev disabled={this.props.data.currentPageNumber===0? true:false} onClick={()=>this.props.navigateToPage(this.props.data.currentPageNumber-1)}/>
                    :null}
                    {this.props.data.totalPages.map(data=>{
                        if(data===this.props.data.currentPageNumber){
                            return(
                                <Pagination.Item key={data} active>{data+1}</Pagination.Item>
                            )
                        }else{
                            return(
                                <Pagination.Item key={data} onClick={()=>{this.props.navigateToPage(data)}}>{data+1}</Pagination.Item>
                            )
                        }
                    })}
                     { (this.props.data.totalPages.length >1  && this.props.data.currentPageNumber+1!==this.props.data.totalPages.length)?
                        <Pagination.Next onClick={()=>this.props.navigateToPage(this.props.data.currentPageNumber+1)}/>
                    :null}
                </Pagination>
            )
        }
    }
}
export default CasesPagination;