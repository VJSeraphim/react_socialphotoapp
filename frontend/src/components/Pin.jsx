import React, { useState } from 'react';
import { urlFor } from '../client';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'

import { MdDownloadForOffline } from 'react-icons/md'
import { AiTwotoneDelete } from 'react-icons/ai'
import { BsFillArrowUpRightCircleFill } from 'ract-icons-bs'

import { urlFor, client } from '../client'
import { fetchUser } from '../utils/fetchUser';

const Pin = ({ pin: { postedBy, image, _id, destionation }}) => {
    const [postHovered, setPostHovered] = useState(false);
    const navigate = useNavigate()

    const user = fetchUser()

    const alreadySaved = !!(save?.filter((i) => i.postedBy._id === user.googleId))?.length
    
    const savePin = (id) => {
        if(!alreadySaved) {
            client.patch(id).setIfMissing({ save: []}).insert('after', 'save[-1]', [{
                key: uuidv4(),
                userId: user.googleId,
                postedBy: {
                    _type: 'postedBy',
                    _ref: user.googleId
                }
            }])
            .commit()
            .then(() => {
                window.location.reload()
            })
        }
    }
    
    return (
        <div className="m-2">
            <div
                onMouseEnter={() => setPostHovered(true)}
                onMouseLeave={() => setPostHovered(false)}
                onClick={() => Navigate(`/pin-detail/${_id}`)}
                className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
            >
            <img 
                className="rounded-lg w-full"
                alt="user-post"
                src={urlFor(image).width(250).url()}
            />
            {postHovered && (
                <div
                    className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50"
                    style={{ height: '100%'}}
                >
                    <div className="flex items-center justify-between">
                        <div classNAme="flex gap-2">
                            <a
                                href={`${image?.asset?.url}?dl=`}
                                download
                                onClick={(e) => e.stopPropagation()}
                                className="bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                            >
                                <MdDownloadForOffline />
                            </a>
                        </div>
                        {alreadySaved ? (
                            <button type="button" className="bg-red-500">
                                {save?.length} Saved
                            </button>
                        ) : (
                            <button 
                                type="button" 
                                className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-medium outlined-none"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    savePin(_id)
                                }}
                            >
                                Save
                            </button>
                        )}
                    </div>
                    <div className="flex justify-between items-center gap-2 w-full">
                        {destination && (
                            <a
                                href={destination}
                                target="_blank"
                                rel="noreferrer"
                                className="bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4"
                            >

                            </a>
                        )}
                    </div>
                </div>
            )}
            </div>
        </div>
    );
};

export default Pin;
