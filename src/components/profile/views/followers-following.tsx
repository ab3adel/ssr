

interface iProps {company:boolean}
export const FollowersFollowing=({company}:iProps)=>{

    return (
        <div className="fowllowingFollowers">
            {company?
             <div className="bg double double-width">
                <div className="mx-1">
                    <span>35</span>
                    <span>Following</span>
                </div>
                <div className="verticalLine" />
                <div className="mx-1">
                    <span>35</span>
                    <span>Following</span>
                </div>
             </div>
             :<div className="bg single single-width">
                 <div>
                    <span>35</span>
                    <span>Following</span>
                 </div>
             </div>
            }
        </div>
    )
}