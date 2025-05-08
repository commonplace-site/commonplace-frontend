import { Question } from "@/types/questions";
import { JSX } from "react";
import { Textarea } from "../../ui/textarea";
import { Checkbox } from "../../ui/checkbox";
import { Input } from "../../ui/input";
import StepNavigation from "@/components/common/pagination-controls/StepNavigation";

const Questions = ({ page, setPage, questions }: { page: number, setPage: (page: number) => void, questions: Question[] }): JSX.Element => {
    return <div >
        <div className="min-h-[460px] flex flex-col justify-center">
            <div>{questions.map((question: Question, index: number): JSX.Element => (
                page === index + 1 ? <div key={index + '-shadowbank-question'} className="flex flex-col">
                    <div className="subtitle m-auto mb-2">{index + 1}/{questions.length}</div>
                    <div className="container w-[80%] m-auto p-8">
                        <p className="text-big mb-4">{question.question}</p>
                        {question.variants !== undefined &&
                            <div>
                                {question.type === "textareaGroup" && <div>
                                    {question.variants.map((variant: string, index: number): JSX.Element => {
                                        return <div key={index + '-shadowbank-question-textareaGroup'}>
                                            <p className="text-title" >{variant}</p>
                                            <div className="mt-2 mb-4"><Textarea placeholder="Text the answer..." className="h-[100px]" /></div>
                                        </div>
                                    })}
                                </div>}
                                {question.type === 'multipleChoice' && <div>
                                    {question.variants.map((variant: string, index: number): JSX.Element => {
                                        return <div key={index + '-shadowbank-questions-multipleChoice'}>
                                            <label className="flex cursor-pointer items-center space-x-2">
                                                <Checkbox />
                                                <span className="text-subtitle">{variant}</span>
                                            </label>
                                        </div>
                                    })}
                                </div>}
                                {question.type === 'singleChoice' && <div>
                                    {question.variants.map((variant: string, index: number): JSX.Element => (
                                        <label
                                            key={index + '-shadowbank-questions-singleChoice'}
                                            className="flex items-center space-x-2 cursor-pointer"
                                        >
                                            <input
                                                type="radio"
                                                className="w-4 h-4"
                                                name={`question-${question.id}`}
                                                value={variant}
                                            />
                                            <span className="text-subtitle">{variant}</span>
                                        </label>
                                    ))}
                                </div>}
                            </div>
                        }

                        {question.type === 'input' && <div>
                            <Input type="text" className="mt-4" placeholder="Enter your response" />
                        </div>}

                        {question.type === 'textarea' && <div>
                            <Textarea placeholder="Provide a detailed answer" className="h-[100px]" />
                        </div>}
                    </div>
                </div> : <div key={index}></div>
            ))}
            </div>
        </div>
        <div><StepNavigation page={page} setPage={setPage} totalPages={questions.length} /></div>
    </div>
}

export default Questions;